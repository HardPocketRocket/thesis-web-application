const router = require("express").Router();
let User = require("../models/user.model");

router.route("/:id").get((req, res) => {
    User.findOne({ _id : req.params.id })
        .then(data => res.json(data))
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
