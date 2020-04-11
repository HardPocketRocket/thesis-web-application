const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
	id: mongoose.Schema.Types.ObjectId,
	participants: [{ type: String }],
	title: { type: String },
	startDate: { type: String },
	endDate: { type: String },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
