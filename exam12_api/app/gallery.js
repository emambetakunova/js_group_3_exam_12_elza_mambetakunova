const express = require('express');
const multer = require('multer');
const path = require('path');
const config = require('../config');
const nanoid = require('nanoid');
const auth = require('../middleware/auth');
const tryAuth = require('../middleware/tryAuth');
const permit = require('../middleware/permit');

const Gallery = require('../models/Gallery');


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

router.get('/', (req, res) => {
    let criteria = {};
    if (req.query.user) {
        criteria = {
            user: req.query.user
        }
    }
    Gallery.find(criteria).populate({
        path: 'user',
        select: {displayName: 'displayName', _id: '_id'}
    })
        .then(result => {
            if (result) return res.send(result);
            res.sendStatus(404)
        })
        .catch(error => res.status(500).send(error));

});

router.get('/:id', (req, res) => {
    Gallery.findById(req.params.id)
        .then(result => {
            if (result) return res.send(result);
            res.sendStatus(404)
        })
        .catch(() => res.sendStatus(500));
});


router.post('/', auth, upload.single('image'), (req, res) => {
    const galleryData = req.body;
    if (req.file) {
        galleryData.image = req.file.filename;
    }
    const gallery = new Gallery({
        title: req.body.title,
        image: req.file.filename,
        user: req.user._id
    });
    gallery.save()
        .then(result => res.send(result))
        .catch(error => res.sendStatus(400).send(error));
});


module.exports = router;