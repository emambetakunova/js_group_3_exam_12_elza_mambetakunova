const express = require('express');

const users = require('./app/users');
const gallery = require('./app/gallery');

const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const config = require('./config');

const port = 8000;
app.use(express.json());
app.use(express.static('public'));
app.use(cors());


mongoose.connect(config.dbUrl, config.mongoOptions).then(() => {
    app.use('/users', users);
    app.use('/gallery', gallery);

    app.listen(port, () => {
        console.log(`Server started on ${port} port`);
    });
});