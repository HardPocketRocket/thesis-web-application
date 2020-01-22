const router = require("express").Router();
let User = require("../models/user.model");

router.route("/:term").get((req, res) => {
    User.find({ subjects: req.params.term })
        .then(data => res.json(data))
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
