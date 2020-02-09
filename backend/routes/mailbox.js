const router = require('express').Router();
let Mailbox = require('../models/mailbox.model');
let User = require('../models/user.model');

router.route('/:id').get((req, res) => {
	Mailbox.find({ participants: req.params.id })
		.then(mailbox => {
			res.json(mailbox);
		})
		.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:idTo/:idFrom').get((req, res) => {
	Mailbox.findOne({
		participants: { $all: [req.params.idFrom, req.params.idTo] }
	})
		.then(mailbox => {
			if (mailbox !== null) {
				res.json(mailbox._id);
			} else {
				res.json(null);
			}
		})
		.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
	const participants = req.body.participants;
	const newMailbox = new Mailbox({ participants });

	newMailbox
		.save()
		.then(mailbox => {
			participants.forEach((element, mailbox) => {
				User.findByIdAndUpdate(
					{ _id: element },
					{ $push: { mailboxes: mailbox._id } }
				).then(results => console.log(results));
			});
			res.json(mailbox._id);
		})
		.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').patch((req, res) => {
	const message = req.body.message;

	Mailbox.findByIdAndUpdate(
		{ _id: req.params.id },
		{ $push: { messages: message } }
	)
		.then(mailbox => {
			res.json(mailbox);
		})
		.catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
