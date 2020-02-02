const mongoose = require("mongoose");

const mailboxSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    participants: [{ type: String }],
    messages: [{ type: String }]
});

const Mailbox = mongoose.model("Mailbox", mailboxSchema);

module.exports = Mailbox;
