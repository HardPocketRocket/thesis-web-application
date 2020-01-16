const router = require("express").Router();
let User = require("../models/user.model");

router.route('/').get((req, res) => {
    res.json('Home Screen');
});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            res.json(user);
        })
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;