const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username: username, password: password })
        .then(user => {
            if (user !== null) {
                res.json(user._id);
            } else {
                res.status(400).json('Invalid Login');
            }
        })
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
