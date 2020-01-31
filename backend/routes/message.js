const router = require("express").Router();
let Message = require("../models/user.model");

router.route("/:id").get((req, res) => {
    Message.find({ mailboxId: req.params.id })
        .then(messages => {
            res.json(messages);
        })
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/").post((req, res) => {
    const mailboxId = req.body.mailboxId;
    const to = req.body.to;
    const from = req.body.from;
    const message = req.body.message;

    const newMessage = new Message({ mailboxId, to, from, message });

    newMessage
        .save()
        .then(message => {
            console.log(message);
            res.json(message._id);
        })
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
