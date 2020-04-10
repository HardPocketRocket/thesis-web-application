const router = require('express').Router();
let Rating = require('../models/rating.model');
let User = require('../models/user.model');

router.route('/').post((req, res) => {
	const value = req.body.value;
	const to = req.body.to;
	const from = req.body.from;

	const newRating = new Rating({ to, from, value });

	newRating.save().then((rating) => {
		User.findByIdAndUpdate({ _id: to }, { $push: { ratings: rating._id } }, { new: true }).then(
			(user) => {
				Rating.find({ to: user._id }).then((ratings) => {
					let ratingAvg = 0;
					for (let i = 0; i < ratings.length; i++) {
						ratingAvg += ratings[i].value;
					}

					let newRatingAvg = ratingAvg / user.ratings.length;
					newRatingAvg = parseFloat(newRatingAvg.toFixed(1));

					User.findByIdAndUpdate(
						{ _id: user._id },
						{ $set: { ratingAvg: newRatingAvg } },
						{ new: true }
					).then((user) => {
						res.json(user);
					});
				});
			}
		);
	});
});

router.route('/:idTo/:idFrom').get((req, res) => {
	Rating.findOne({
		to: req.params.idTo,
		from: req.params.idFrom,
	}).then((rating) => {
		res.json(rating);
	});
});


router.route('/:id/:idTo').delete((req, res) => {
	User.findByIdAndUpdate(
		{ _id: req.params.idTo },
		{ $pull: { ratings: req.params.id } },
		{ new: true }
	).exec().then(
		Rating.findByIdAndDelete({ _id: req.params.id }).then(
			Rating.find({ to: req.params.idTo }).exec().then((ratings) => {
				if (ratings === []) {
	
					User.findByIdAndUpdate(
						{ _id: user._id },
						{ $set: { ratingAvg: 0 } },
						{ new: true }
					).then((user) => {
						res.json(user);
					});
				} else {
	
					let ratingAvg = 0;
					for (let i = 0; i < ratings.length; i++) {
						ratingAvg += ratings[i].value;
					}
	
					let newRatingAvg = ratingAvg / ratings.length;
					newRatingAvg = parseFloat(newRatingAvg.toFixed(1));
	
					User.findByIdAndUpdate(
						{ _id: req.params.idTo },
						{ $set: { ratingAvg: newRatingAvg } },
						{ new: true }
					).then((user) => {
						res.json(user);
					});
				}
			})
		)
	)
});

module.exports = router;
