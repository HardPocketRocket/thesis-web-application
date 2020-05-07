const mongoose = require('mongoose');
const chai = require('chai');
require('dotenv').config();

let Appointment = require('../models/appointment.model');
let User = require('../models/user.model');
let Mailbox = require('../models/mailbox.model');
let Rating = require('../models/rating.model');
let Message = require('../models/message.model');

let assert = chai.assert;

describe('Database Tests', function () {
	//Before starting the test, create a sandboxed database connection
	//Once a connection is established invoke done()
	before(function (done) {
		const uri = process.env.ATLAS_URI;

		mongoose.connect(uri, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		});
		const db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error'));
		db.once('open', function () {
			console.log('We are connected to test database!');
			done();
		});
	});

	describe('Appointment Database', function () {
        let testId;

		it('New appointment saved to test database', function (done) {
			var testAppointment = Appointment({
				participants: ['5ea2f23ba9d8ed34c8936d4e', '5ea2f1fda9d8ed34c8936d4d'],
				title: 'Test',
				startDate: 'Fri Apr 24 2020 16:06:26 GMT+0200 (Central European Summer Time)',
				endDate: 'Fri Apr 24 2020 20:06:26 GMT+0200 (Central European Summer Time)',
			});
			console.log(testAppointment.isNew);
			
			testAppointment.save().then(() => {
				assert(!testAppointment.isNew);
				done();
			})
		});

		it('Should retrieve appointment from test database', function (done) {
			Appointment.find({
				participants: ['5ea2f23ba9d8ed34c8936d4e', '5ea2f1fda9d8ed34c8936d4d'],
			}).then((res) => {
				if (res.length >= 1) {
                    testId = res._id;
					done();
				}
			});
        });
        
        it('Should delete appointment from test database', function (done) {
			Appointment.deleteOne({
				id: testId
			}).then((res) => {
				if (res.deletedCount === 1) {
                    done();
                }
			});
        });

	});
});
