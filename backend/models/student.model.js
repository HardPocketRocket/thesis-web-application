const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    username: {type: String, required: true, trim: true, unique: true},
    password: {type: String, required: true},
    subjects: [{type : mongoose.Schema.Types.ObjectId, ref: 'Subject'}]
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;