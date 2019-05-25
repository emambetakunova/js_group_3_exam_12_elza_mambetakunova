const express = require('express');
const config = require("../config");
const multer = require('multer');
const path = require('path');
const axios = require("axios");
const nanoid = require("nanoid");

const User = require('../models/User');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const router = express.Router();

router.post('/', upload.single('avatarImage'), (req, res) => {
    try {
        let filename = 'avatar.jpg';
        if (req.file && req.file.filename) {
            filename = req.file.filename;
        }
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            displayName: req.body.displayName,
            avatarImage: filename
        });

        user.generateToken();

        user.save()
            .then(user => res.send({username: user.username, message: 'User registered', user}))
            .catch(error => res.status(400).send(error))
    } catch(error){
        res.status(400).send(error)
    }
});

router.post('/sessions', async (req, res) => {
    const user = await User.findOne({username: req.body.username});

    if (!user) {
        return res.status(400).send({error: 'Username/password incorrect'})
    }

    const isMatch = user.checkPassword(req.body.password);

    if (!isMatch) {
        return res.status(400).send({error: 'Username/password incorrect'})
    }

    user.generateToken();

    await user.save();

    res.send({token: user.token, username: user.username, role: user.role})
});


router.delete('/sessions', async (req, res) => {
    const token = req.get('Authorization');
    const success = {message: 'Logged out'};

    if (!token) {
        return res.send(success);
    }
    const user = await User.findOne({token});

    if (!user) {
        return res.send(success);
    }

    user.generateToken();
    await user.save();

    return res.send(success);
});

router.post('/facebookLogin', async(req, res) => {
    const inputToken = req.body.accessToken;
    const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;
    const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;
    try{
        const response = await  axios.get(debugTokenUrl);
        const responseData = response.data;

        if(responseData.data.error) {
            return res.status(500).send({error: 'Token incorrect'})
        }

        if(responseData.data.user_id !== req.body.id) {

            return res.status(500).send({error: 'User is wrong'})
        }

        let user = await User.findOne({facebookId: req.body.id});

        if(!user) {
            user = new User ({
                username: req.body.email || req.body.id,
                password: nanoid(),
                facebookId: req.body.id,
                displayName: req.body.name,
                avatarImage: req.body.picture.data.url
            })
        }

        user.generateToken();

        await user.save();

        return res.send({message: 'Login or register successful', user})
    } catch(e){
        return res.status(500).send({error: 'Facebook token incorrect'})
    }
});


module.exports = router;