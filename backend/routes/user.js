const router = require('express').Router();
let User = require('../models/user.model');

router.route('/:id').get((req, res) => {
	User.findOne({ _id: req.params.id })
		.then(data => res.json(data))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').patch((req, res) => {
	const subject = req.body.subject;

	User.findByIdAndUpdate(
		{ _id: req.params.id },
		{ $push: { subjects: subject } },
		{ new: true }
	)
		.then(user => {
			res.json(user);
			console.log(user);
		})
		.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id/subjects').patch((req, res) => {
    const subject = req.body.subject;
    
    console.log(subject);
    

	User.findByIdAndUpdate(
		{ _id: req.params.id },
		{ $pull: { subjects: subject }},
		{ new: true }
	)
		.then(user => {
			res.json(user);
			console.log(user);
		})
		.catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
