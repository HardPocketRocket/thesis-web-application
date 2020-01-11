const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    students: [{type : mongoose.Schema.Types.ObjectId, ref: 'Student'}],
    tutors: [{type : mongoose.Schema.Types.ObjectId, ref: 'Tutors'}]
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;