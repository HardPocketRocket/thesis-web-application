const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const isTutor = req.body.isTutor;
    const subjects = req.body.subjects;
    const mailboxes = [];

    const newUser = new User({ username, password, firstName, lastName, isTutor, subjects, mailboxes });

    newUser
        .save()
        .then(user => {
            console.log(user);
            res.json(user._id);
        })
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
