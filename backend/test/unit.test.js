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

	describe('Mailbox Database', function () {
        let testId;

		it('New mailbox saved to test database', function (done) {
			var testMailbox = Mailbox({
				participants: ['5ea2f23ba9d8ed34c8936d4e', '5ea2f1fda9d8ed34c8936d4d'],
				messages: ['message_1', 'message_2']
			});
			
			testMailbox.save().then(() => {
				assert(!testMailbox.isNew);
				done();
			})
		});

		it('Should retrieve mailbox from test database', function (done) {
			Mailbox.find({
				participants: ['5ea2f23ba9d8ed34c8936d4e', '5ea2f1fda9d8ed34c8936d4d'],
			}).then((res) => {
				if (res.length >= 1) {
                    testId = res._id;
					done();
				}
			});
        });
        
        it('Should delete mailbox from test database', function (done) {
			Mailbox.deleteOne({
				id: testId
			}).then((res) => {
				if (res.deletedCount === 1) {
                    done();
                }
			});
        });

	});

	describe('Message Database', function () {
        let testId;

		it('New message saved to test database', function (done) {
			var testMessage = Message({
				mailboxId: 'testMailbox',
    			to: '5ea2f23ba9d8ed34c8936d4e',
    			from: '5ea2f1fda9d8ed34c8936d4d',
    			message: 'hello'
			});
			
			testMessage.save().then(() => {
				assert(!testMessage.isNew);
				done();
			})
		});

		it('Should retrieve message from test database', function (done) {
			Message.find({
				message: 'hello',
			}).then((res) => {
				if (res.length >= 1) {
                    testId = res._id;
					done();
				}
			});
        });
        
        it('Should delete message from test database', function (done) {
			Message.deleteOne({
				id: testId
			}).then((res) => {
				if (res.deletedCount === 1) {
                    done();
                }
			});
        });

	});

	describe('Rating Database', function () {
        let testId;

		it('New rating saved to test database', function (done) {
			var testRating = Rating({
    			to: '5ea2f23ba9d8ed34c8936d4e',
    			from: '5ea2f1fda9d8ed34c8936d4d',
    			value: 5
			});
			
			testRating.save().then(() => {
				assert(!testRating.isNew);
				done();
			})
		});

		it('Should retrieve rating from test database', function (done) {
			Rating.find({
				to: '5ea2f23ba9d8ed34c8936d4e'
			}).then((res) => {
				if (res.length >= 1) {
                    testId = res._id;
					done();
				}
			});
        });
        
        it('Should delete rating from test database', function (done) {
			Rating.deleteOne({
				id: testId
			}).then((res) => {
				if (res.deletedCount === 1) {
                    done();
                }
			});
        });

	});

	describe('User Database', function () {
        let testId;

		it('New user saved to test database', function (done) {
			var testUser = User({
    			username: 'unit test',
				password: 'password',
				firstName: 'Test',
				lastName: 'Testington',
				gender: 'test',
				dateOfBirth: 'test',
				joinDate: 'test',
				isTutor: false,
				subjects: ['Math'],
				mailboxes: ['test'],
				ratings: ['rating id'],
				ratingAvg: 4.5,
				timeSlots: ['appointment id']
			});
			
			testUser.save().then(() => {
				assert(!testUser.isNew);
				done();
			})
		});

		it('Should retrieve user from test database', function (done) {
			User.find({
				username: 'unit test'
			}).then((res) => {
				if (res.length >= 1) {
                    testId = res._id;
					done();
				}
			});
        });
        
        it('Should delete user from test database', function (done) {
			User.deleteOne({
				id: testId
			}).then((res) => {
				if (res.deletedCount === 1) {
                    done();
                }
			});
        });

	});
});
