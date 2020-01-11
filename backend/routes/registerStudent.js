const router = require('express').Router();
let Student = require('../models/student.model');

router.route('/').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const newStudent = new Student({username, password});

    newStudent.save()
        .then(() => res.json("Student added"))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;