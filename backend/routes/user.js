const router = require('express').Router();
let User = require('../models/user.model');

router.route('/:id').get((req, res) => {
	User.findOne({ _id: req.params.id })
		.then((data) => res.json(data))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id/subjects').patch((req, res) => {
	const newSubjects = req.body.subjects;

	User.findByIdAndUpdate(
		{ _id: req.params.id },
		{ $set: { subjects: newSubjects } },
		{ new: true }
	)
		.then((user) => {
			res.json(user);
			console.log(user);
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id/profile').patch((req, res) => {
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const gender = req.body.gender;
	const dateOfBirth = req.body.dateOfBirth;
	const username = req.body.username;

	console.log(req.body);

	User.findByIdAndUpdate(
		{ _id: req.params.id },
		{
			$set: {
				firstName: firstName,
				lastName: lastName,
				gender: gender,
				dateOfBirth: dateOfBirth,
				username: username,
			},
		},
		{ new: true }
	)
		.then((user) => {
			res.json(user);
			console.log(user);
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id/rating').patch((req, res) => {
	const rating = req.body.rating;
	const ratedBy = req.body.ratedBy;

	User.findByIdAndUpdate(
		{ _id: req.params.id },
		{ $push: { rating: rating, ratedBy: ratedBy } },
		{ new: true }
	)
		.then((user) => {
			let ratingAvg = 0;
			for (var i = 0; i < user.rating.length; i++) {
				ratingAvg += user.rating[i];
			}
			let newRatingAvg = ratingAvg / user.rating.length;
			newRatingAvg = parseFloat(newRatingAvg.toFixed(1))

			User.findByIdAndUpdate(
				{ _id: req.params.id },
				{ $set: { ratingAvg: newRatingAvg } },
				{ new: true }
			).then((user) => {
				res.json(user);
				console.log(user);
			});
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
