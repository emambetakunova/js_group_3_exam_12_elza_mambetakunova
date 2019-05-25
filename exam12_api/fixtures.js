const mongoose = require('mongoose');
const config = require('./config');
const nanoid = require('nanoid');

const User = require('./models/User');
const Gallery = require('./models/Gallery');

const run = async () => {
    await mongoose.connect(config.dbUrl, config.mongoOptions);

    const connection = mongoose.connection;

    const collections = await connection.db.collections();

    for (let collection of collections) {
        await collection.drop();
    }

    const users = await User.create(
        {username: 'Adam', password: '123', token: nanoid(), avatarImage: 'adam.jpeg', displayName: 'Adam'},
        {username: 'Leila', password: '123', token: nanoid(), avatarImage: 'leila.jpeg', displayName: 'Leila'}

    );

     await Gallery.create(
        {
            title: 'Sun',
            image: 'sun.jpg',
            user: users[0]._id
        },
        {
            title: 'People',
            image: 'people.jpg',
            user: users[1]._id
        }
    );

    await connection.close();

};

run().catch(error => {
    console.error('Something went wrong', error);
});