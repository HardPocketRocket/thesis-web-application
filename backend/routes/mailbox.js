const router = require("express").Router();
let Mailbox = require("../models/mailbox.model");

router.route("/:id").get((req, res) => {
    Mailbox.find({ belongsTo: req.params.id })
        .then(mailbox => {
            res.json(mailbox);
        })
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:idTo/:idFrom").get((req, res) => {
    Mailbox.findOne({
        belongsTo: req.params.idTo,
        messagesFrom: req.params.idFrom
    })
        .then(mailbox => {
            console.log("found");
            res.json(mailbox);
        })
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/").post((req, res) => {
    const belongsTo = req.body.belongsTo;
    const messagesFrom = req.body.messagesFrom;

    const newMailbox = new Mailbox({ belongsTo, messagesFrom });

    newMailbox
        .save()
        .then(mailbox => {
            console.log("created")
            res.json(mailbox._id);
        })
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").patch((req, res) => {
    const message = req.body;

    Mailbox.findOneAndUpdate(
        { belongsTo: req.params.id },
        { $push: { messages: message } }
    )
        .then(mailbox => {
            res.json(mailbox);
        })
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
