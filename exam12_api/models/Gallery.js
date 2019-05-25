const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GallerySchema = new Schema({
    title: {
        type: String, required: true
    },
    image: {
        type: String, required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Cocktail = mongoose.model('Cocktail', GallerySchema);
module.exports = Cocktail;