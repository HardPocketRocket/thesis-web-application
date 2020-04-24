const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
	id: mongoose.Schema.Types.ObjectId,
	participants: [{ type: String, required: true }],
	title: { type: String, required: true },
	startDate: { type: String, required: true },
	endDate: { type: String, required: true },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
