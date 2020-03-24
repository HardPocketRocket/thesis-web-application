const router = require('express').Router();
let User = require('../models/user.model');

router.route('/:id').get((req, res) => {
	User.findOne({ _id: req.params.id })
		.then(data => res.json(data))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id/subjects').patch((req, res) => {
	const newSubjects = req.body.subjects;

	console.log(newSubjects);

	User.findByIdAndUpdate(
		{ _id: req.params.id },
		{ $set: { subjects: newSubjects } },
		{ new: true }
	)
		.then(user => {
			res.json(user);
			console.log(user);
		})
		.catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
