const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    username: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    isTutor: { type: Boolean, required: true },
    subjects: [{ type: String }],
    mailboxes: [{type: String}]
});

const User = mongoose.model("User", userSchema);

module.exports = User;