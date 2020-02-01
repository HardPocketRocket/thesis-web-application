const mongoose = require("mongoose");

const mailboxSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    belongsTo: { type: String, required: true },
    messagesFrom: { type: String, required: true },
    messages: [{ type: String}]
});

const Mailbox = mongoose.model("Mailbox", mailboxSchema);

module.exports = Mailbox;
