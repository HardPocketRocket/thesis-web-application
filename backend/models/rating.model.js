const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    to: {type: String, required: true},
    from: {type: String, required: true},
    value: {type: Number, required: true}
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;