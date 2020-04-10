const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
	id: mongoose.Schema.Types.ObjectId,
	participants: [{ type: String }],
	title: { type: String },
	startDate: { type: String },
	endDate: { type: String },
});

const TimeSlot = mongoose.model('TimeSlot', timeSlotSchema);

module.exports = TimeSlot;
