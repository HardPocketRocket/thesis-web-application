import React, { Component } from 'react';
import axios from 'axios';

import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import { withStyles, Box, Typography, TextField, Button, Grid } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

const socket = require('socket.io-client');
let socketClient;

const styles = {
	root: {
		display: 'flex',
		flexDirection: 'column',
	},
	container: {
		display: 'flex',
		flexDirection: 'column',
		spacing: 2,
		height: '87vh',
		width: '100%',
		overflow: 'auto',
		marginBottom: 16,
	},
	sentMessage: {
		flex: '0 0 auto',
		marginTop: 16,
		marginRight: 16,
		borderRadius: '12px',
		maxWidth: '40%',
		minHeight: '32px',
		alignSelf: 'flex-end',
		background: 'linear-gradient(45deg, #FE6B8B 25%, #FF8E53 90%)',
	},
	receivedMessage: {
		flex: '0 0 auto',
		marginTop: 16,
		marginLeft: 20,
		borderRadius: '12px',
		maxWidth: '40%',
		minHeight: '32px',
		alignSelf: 'flex-start',
		background: 'linear-gradient(45deg, #9d47bf 1%, #FE6B8B 90%)',
	},
	text: {
		color: 'white',
		wordBreak: 'break-all',
		paddingLeft: '8px',
		paddingRight: '8px',
		paddingTop: '5px',
		alignSelf: 'flex-start',
	},
	textField: {
		width: '87%',
		postition: 'fixed',
		left: '1%',
	},
	outlinedRoot: {
		'&:hover $notchedOutline': {
			borderColor: '#FF8E53',
			borderWidth: 2,
		},
		'&$focused $notchedOutline': {
			borderColor: '#FE6B8B',
			borderWidth: 2,
		},
	},
	notchedOutline: {},
	focused: {},
	label: {
		'&$focusedLabel': {
			color: '#FE6B8B',
		},
	},
	focusedLabel: {},
	button: {
		background: 'linear-gradient(45deg, #ff5e81 30%, #FF8E53 90%)',
		border: 0,
		color: 'white',
		width: '10%',
		minHeight: '56px',
		position: 'fixed',
		right: '1%',
	},
	messageBox: {
		display: 'flex',
		flexDirection: 'row',
		position: 'fixed',
		bottom: 16,
		width: '100%',
	},
	topBar: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		height: '5vh',
		borderBottom: '2px solid #ff5e81',
	},
	topBarText: {
		marginLeft: '48%',
		marginTop: 14,
		fontSize: 20,
	},
	topBarButton: {
		position: 'fixed',
		top: 8,
		right: 16,
		background: 'linear-gradient(45deg, #ff5e81 30%, #FF8E53 90%)',
		border: 0,
		color: 'white',
	},
	topBarHomeButton: {
		position: 'fixed',
		top: 8,
		left: 16,
		background: 'linear-gradient(45deg, #ff5e81 30%, #FF8E53 90%)',
		border: 0,
		color: 'white',
	},
	modal: {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		background: 'rgba(0, 0, 0, 0.6)',
		display: 'block',
	},
	modalMain: {
		borderRadius: 12,
		position: 'fixed',
		background: 'white',
		width: '30%',
		height: '30%',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%,-50%)',
	},
	modalCloseButton: {
		position: 'fixed',
		top: 10,
		right: 8,
		height: '8%',
		width: '8%',
	},
	modalText: {
		marginRight: '30%',
		marginLeft: '40%',
		marginTop: '2%',
	},
	modalTextField: {
		width: '100%',
	},
	grid: {
		width: '92%',
		marginLeft: '4%',
		marginRight: '3%',
		marginTop: 24,
		display: 'flex',
		flexDirection: 'row',
	},
	fromDate: {
		width: '96%',
		marginTop: 24,
	},
	toDate: {
		width: '96%',
		marginTop: 24,
		marginLeft: '4%'
	},
	submitAppointmentButton: {
		background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
		border: 0,
		color: 'white',
		height: 40,
		width: '92%',
		marginTop: '8%',
		marginBottom: 16,
		marginLeft: '4%',
		marginRight: '3%',
	},
};

class MessageComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: sessionStorage.getItem('id'),
			mailboxId: props.match.params.id,
			receiver: '',
			sender: sessionStorage.getItem('id'),
			message: '',
			messageList: [],
			receiverFirstName: '',
			receiverLastName: '',
			receiverUsername: '',

			showAppointmentModal: false,
			appointmentTitle: '',
			selectedFromDate: new Date(),
			selectedToDate: new Date(),
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.onChangeMessage = this.onChangeMessage.bind(this);
		this.getReceiver = this.getReceiver.bind(this);

		socketClient = socket.connect('http://localhost:5000');
		socketClient.emit('login', this.state.id);

		socketClient.on('private', (message) => {
			console.log(message);
			console.log(this.state.receiver);
			
			if(this.state.receiver === message.from){
				this.setState((prevState) => ({
					messageList: [...prevState.messageList, message],
				}));
				console.log(this.state.messageList);
			}
		});

		axios.get('http://localhost:5000/message/' + this.state.mailboxId).then((res) => {
			this.setState({
				messageList: res.data,
			});
		});

		axios.get('http://localhost:5000/mailbox/' + sessionStorage.getItem('id')).then((res) => {
			const receiver = this.getReceiver(res.data[0].participants);

			this.setState(
				{
					receiver: receiver,
				},
				this.getReceiverInfo
			);
		});
	}

	getReceiverInfo = () => {
		axios.get('http://localhost:5000/user/' + this.state.receiver + '/name').then((res) => {
			this.setState({
				receiverFirstName: res.data.firstName,
				receiverLastName: res.data.lastName,
				receiverUsername: res.data.username,
			});
		});
	};

	getReceiver(participants) {
		let receiver;

		participants.forEach((element) => {
			if (element !== sessionStorage.getItem('id')) {
				receiver = element;
			}
		});
		return receiver;
	}

	handleFromDateChange = (date) => {
		this.setState({
			selectedFromDate: date,
		});
	};

	handleToDateChange = (date) => {
		this.setState({
			selectedToDate: date,
		});
	};

	onChangeMessage(event) {
		window.scrollTo(450, 2000);

		this.setState({
			message: event.target.value,
		});
	}

	onChangeAppointmentTitle = (event) => {
		this.setState({
			appointmentTitle: event.target.value
		})
	}

	onHomeClicked = (event) => {
		this.props.history.push('/home/' + sessionStorage.getItem('id'));
	};

	showAppointmentModal = () => {
		this.setState({ showAppointmentModal: true });
	};

	hideAppointmentModal = () => {
		this.setState({ showAppointmentModal: false });
	};

	onSubmitAppointment = () => {
		console.log(this.state.selectedToDate, this.state.selectedFromDate);
		
		axios.post('http://localhost:5000/appointment/', {
			participants: [this.state.sender, this.state.receiver],
			title: this.state.appointmentTitle,
			startDate: this.state.selectedFromDate.toString(),
			endDate: this.state.selectedToDate.toString()
		});

		this.setState({
			appointmentTitle: '',
			selectedFromDate: new Date(),
			selectedToDate: new Date(),
		})

		this.hideAppointmentModal();
	}

	onSubmit(event) {
		event.preventDefault();

		const message = {
			mailboxId: this.state.mailboxId,
			to: this.state.receiver,
			from: sessionStorage.getItem('id'),
			message: this.state.message,
		};

		axios.post('http://localhost:5000/message/', message).then((res) => {
			axios.patch('http://localhost:5000/mailbox/' + this.state.mailboxId, {
				message: res.data,
			});
			this.setState({
				messageList: [...this.state.messageList, res.data],
			});

			socketClient.emit('private', res.data);

			console.log(this.state.messageList);
		});

		this.setState({
			message: '',
		});
	}

	componentDidUpdate() {
		let messageView = document.getElementById('messageView');

		if (messageView) {
			messageView.scrollTop = messageView.scrollHeight;
		}
	}

	render() {
		const { classes } = this.props;

		const Messages = (props) => {
			if (this.state.messageList.length < 1) {
				return null;
			}

			const texts = props.messages.map((message) => {
				let messageClass;

				if (sessionStorage.getItem('id') === message.from) {
					messageClass = classes.sentMessage;
				} else {
					messageClass = classes.receivedMessage;
				}

				return (
					<Box className={messageClass} key={message._id}>
						<Typography className={classes.text}>{message.message}</Typography>
					</Box>
				);
			});

			return (
				<Box id='messageView' className={classes.container}>
					{texts}
				</Box>
			);
		};

		const AppointmentModal = () => {
			if (this.state.showAppointmentModal) {
				return (
					<div className={classes.modal}>
						<section className={classes.modalMain}>
							<Typography className={classes.modalText} variant='h6'>
								New Appointment
							</Typography>
							<Button
								className={classes.modalCloseButton}
								onClick={this.hideAppointmentModal}
								startIcon={<CloseIcon />}></Button>
							<Grid container className={classes.grid}>
							<TextField
									className={classes.modalTextField}
									required
									autoFocus
									variant='outlined'
									label='Appointment Title'
									type='text'
									value={this.state.appointmentTitle}
									onChange={this.onChangeAppointmentTitle}
									InputProps={{
										classes: {
											root: classes.outlinedRoot,
											notchedOutline: classes.notchedOutline,
											focused: classes.focused,
										},
									}}
									InputLabelProps={{
										classes: {
											root: classes.label,
											focused: classes.focusedLabel,
										},
										required: false,
									}}
								/>
								<Grid item xs={6}>
									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<DateTimePicker
											className={classes.fromDate}
											label='From'
											inputVariant='outlined'
											value={this.state.selectedFromDate}
											onChange={this.handleFromDateChange}
										/>
									</MuiPickersUtilsProvider>
								</Grid>
								<Grid item xs={6}>
									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<DateTimePicker
											className={classes.toDate}
											label='To'
											inputVariant='outlined'
											value={this.state.selectedToDate}
											onChange={this.handleToDateChange}
										/>
									</MuiPickersUtilsProvider>
								</Grid>
							</Grid>
							<Button className={classes.submitAppointmentButton} onClick={this.onSubmitAppointment}>Submit</Button>
						</section>
					</div>
				);
			} else {
				return null;
			}
		};

		return (
			<div>
				<Box className={classes.topBar}>
					<Button className={classes.topBarHomeButton} onClick={this.onHomeClicked}>
						{' '}
						Home
					</Button>
					<Typography className={classes.topBarText}>
						{this.state.receiverUsername}
					</Typography>
					<Button className={classes.topBarButton} onClick={this.showAppointmentModal}>
						{' '}
						Schedule an Appointment
					</Button>
				</Box>
				<Messages messages={this.state.messageList} />
				<form onSubmit={this.onSubmit}>
					<Box className={classes.messageBox}>
						<TextField
							className={classes.textField}
							required
							autoFocus
							variant='outlined'
							label='Message'
							type='text'
							value={this.state.message}
							onChange={this.onChangeMessage}
							InputProps={{
								classes: {
									root: classes.outlinedRoot,
									notchedOutline: classes.notchedOutline,
									focused: classes.focused,
								},
							}}
							InputLabelProps={{
								classes: {
									root: classes.label,
									focused: classes.focusedLabel,
								},
								required: false,
							}}
						/>
						<Button
							className={classes.button}
							variant='outlined'
							type='submit'
							value='submit'>
							Send
						</Button>
					</Box>
				</form>
				<AppointmentModal></AppointmentModal>
			</div>
		);
	}
}

export default withStyles(styles)(MessageComponent);
