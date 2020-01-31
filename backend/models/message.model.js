const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    mailboxId: {type: String, required: true},
    to: {type: String, required: true},
    from: {type: String, required: true},
    message: {type: String, required: true}
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;