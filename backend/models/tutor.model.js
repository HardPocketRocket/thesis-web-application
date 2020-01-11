const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    username: {type: String, required: true, trim: true, unique: true},
    password: {type: String, required: true},
    subjects: [{type : mongoose.Schema.Types.ObjectId, ref: 'Subject'}]
});

const Tutor = mongoose.model('Tutor', tutorSchema);

module.exports = Tutor;