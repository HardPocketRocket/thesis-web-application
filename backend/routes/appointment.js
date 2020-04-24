const router = require('express').Router();
let Appointment = require('../models/appointment.model');

router.route('/:id').get((req, res) => {
	Appointment.find({ participants: req.params.id })
		.then((appointments) => {
            appointments.forEach(appointment => {
                appointment.id = appointment._id;
            });
			res.json(appointments);
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').patch((req, res) => {
    const updatedAppointment = req.body.appointment;
    
	Appointment.findByIdAndUpdate(
		{ _id: req.params.id },
		{ $set: { title: updatedAppointment.title, startDate: updatedAppointment.startDate, endDate: updatedAppointment.endDate} },
		{ new: true}
	)
		.then((appointment) => {
			res.json(appointment);
			console.log(appointment);
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
	const participants = req.body.participants;
	const title = req.body.title;
	const startDate = req.body.startDate;
	const endDate = req.body.endDate;

	console.log(startDate, endDate);

	const newAppointment = new Appointment({ participants, title, startDate, endDate });

	console.log(newAppointment);
	

	newAppointment
		.save()
		.then((appointment) => {
			res.json(appointment);
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
	Appointment.findByIdAndDelete(req.params.id)
		.then((appointment) => {
			res.json(appointment);
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

//TestData
const testData = [
	{
		participants: ['5e8f27e4122ae024bc3bee2f', '5e8f27f6122ae024bc3bee30'],
		title: 'Math with Michael',
		startDate: new Date(2020, 3, 13, 9, 30),
		endDate: new Date(2020, 3, 13, 11, 30),
	},
	{
		participants: ['5e8f27e4122ae024bc3bee2f', '5e8f27f6122ae024bc3bee30'],
		title: 'Math with Arthur',
		startDate: new Date(2020, 3, 14, 9, 30),
		endDate: new Date(2020, 3, 14, 11, 30),
	},
	{
		participants: ['5e8f27e4122ae024bc3bee2f', '5e8f27f6122ae024bc3bee30'],
		title: 'Math with Anna',
		startDate: new Date(2020, 3, 15, 12, 0),
		endDate: new Date(2020, 3, 15, 13, 0),
	},
	{
		participants: ['5e8f27e4122ae024bc3bee2f', '5e8f27f6122ae024bc3bee30'],
		title: 'Math with Nick',
		startDate: new Date(2020, 3, 16, 14, 30),
		endDate: new Date(2020, 3, 16, 15, 30),
	},
	{
		participants: ['5e8f27e4122ae024bc3bee2f', '5e8f27f6122ae024bc3bee30'],
		title: 'Math with Katy',
		startDate: new Date(2020, 3, 17, 12, 0),
		endDate: new Date(2020, 3, 17, 13, 35),
	},
];

//Insert Test Data
// testData.forEach((element) => {
// 	new Appointment(element).save();
// });

module.exports = router;
