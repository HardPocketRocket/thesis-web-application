const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const isTutor = req.body.isTutor;
    const subjects = req.body.subjects;

    const newUser = new User({ username, password, isTutor, subjects });

    newUser
        .save()
        .then(() => {
            if (isTutor === true) {
                res.json("User added as Tutor");
            } else {
                res.json("User added as Student");
            }
        })
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
