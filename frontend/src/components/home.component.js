import React, { Component } from 'react';
import axios from 'axios';

import Card from '@material-ui/core/Card';
import Select from '@material-ui/core/Select';

import { format } from 'date-fns';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import MenuItem from '@material-ui/core/MenuItem';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import EventIcon from '@material-ui/icons/Event';
import PeopleOutlineRoundedIcon from '@material-ui/icons/PeopleOutlineRounded';
import SaveIcon from '@material-ui/icons/Save';
import WcIcon from '@material-ui/icons/Wc';
import CakeIcon from '@material-ui/icons/Cake';
import InputLabel from '@material-ui/core/InputLabel';

import {
	Scheduler,
	WeekView,
	Appointments,
	Toolbar,
	DateNavigator,
	AppointmentTooltip,
	AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState, EditingState, IntegratedEditing} from '@devexpress/dx-react-scheduler';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import { TextField, Button, withStyles, Box, Typography, Grid } from '@material-ui/core';

const styles = {
	form: {
		marginTop: 40,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	mainBox: {
		background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
		marginLeft: 16,
		marginRight: 16,
		marginTop: 32,
		display: 'flex',
		flexDirection: 'row',
		height: '84vh',
		borderRadius: '12px',
	},
	userBox: {
		width: '25%',
		marginLeft: 24,
		marginTop: 24,
		marginBottom: 24,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		background: 'white',
		borderRadius: '12px',
	},
	scheduleBox: {
		width: '80%',
		marginLeft: 24,
		marginRight: 24,
		marginTop: 24,
		marginBottom: 24,
		borderRadius: '12px',
		background: 'white',
		display: 'flex',
		flexDirection: 'row',
	},
	scheduleInnerBox: {
		width: '100%',
		height: '98%',
		borderRadius: '12px',
		background: 'white',
		display: 'flex',
		marginLeft: '1%',
		zIndex: 0
	},
	schedule: {},
	userBoxButton: {
		background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
		border: 0,
		color: 'white',
		height: 40,
		width: '80%',
		marginRight: 16,
		marginLeft: 16,
		marginTop: 24,
	},
	picture: {
		width: '80%',
		height: '40%',
		marginLeft: 16,
		marginTop: 44,
		marginBottom: 16,
		marginRight: 16,
		borderRadius: '12px',
	},
	textField: {
		width: '90%',
		marginLeft: 16,
	},
	outlinedRoot: {
		'&:hover $notchedOutline': {
			borderColor: '#2196F3',
			borderWidth: 2,
		},
		'&$focused $notchedOutline': {
			borderColor: '#2196F3',
			borderWidth: 2,
		},
	},
	notchedOutline: {},
	focused: {},
	label: {
		'&$focusedLabel': {
			color: '#2196F3',
		},
	},
	focusedLabel: {},
	button: {
		background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
		border: 0,
		color: 'white',
		width: '10%',
		marginRight: 16,
		marginLeft: 16,
		minHeight: '58px',
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
		width: '50%',
		height: '40%',
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
		marginLeft: '44%',
		marginTop: '2%',
	},
	newSubjectButton: {
		background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
		border: 0,
		color: 'white',
		width: '20%',
		height: '56px',
		marginLeft: '4%',
		marginRight: '2%',
	},
	deleteSubjectButton: {
		background: 'linear-gradient(45deg, #de161d 30%, #ff363d 90%)',
		border: 0,
		color: 'white',
		width: '20%',
		height: '56px',
		marginLeft: '4%',
		marginRight: '2%',
	},
	modalForm: {
		marginTop: 56,
	},
	modalEditForm: {
		marginTop: 32,
	},
	modalTextField: {
		width: '70%',
		marginLeft: '3%',
	},
	modalEditTextField: {
		width: '45%',
		marginLeft: '3%',
	},
	modalSelect: {
		width: '70%',
		marginLeft: '3%',
	},
	selectLabel: {
		marginLeft: '2%',
		marginBottom: 8,
	},
	userInfoGrid: {
		marginLeft: '20%',
	},
	usernameModalTextField: {
		marginTop: 24,
		width: '93%',
		marginLeft: '3%',
	},
	grid: {
		width: '90%',
		marginLeft: '3%',
	},
	dateOfBirthModal: {
		marginTop: 24,
		width: '100%',
	},
	genderModal: {
		marginTop: 24,
		marginLeft: '10%',
		width: '100%',
	},
	editSubmitButton: {
		marginTop: 24,
		marginLeft: '40%',
		background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
		border: 0,
		color: 'white',
		width: '20%',
		height: '56px',
	},
};

const Appointment = ({ children, style, ...restProps }) => (
	<Appointments.Appointment
		{...restProps}
		style={{
			...style,
			backgroundColor: '#FFC107',
			borderRadius: '8px',
		}}>
		{children}
	</Appointments.Appointment>
);

class HomeComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			isTutor: '',
			subjects: [],
			firstName: '',
			lastName: '',
			joinDate: '',
			dateOfBirth: '',
			gender: '',
			query: '',
			showProfileEditModal: false,
			showTutorEditModal: false,
			newSubject: '',
			deleteSubject: '',

			data: [],

			username_temp: '',
			firstName_temp: '',
			lastName_temp: '',
			dateOfBirth_temp: 'January 01, 2000',
			gender_temp: 'Male',
		};

		this.idOfLastChangedElement = '';

		let options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.onSubmitNewSubject = this.onSubmitNewSubject.bind(this);
		this.onSubmitDeleteSubject = this.onSubmitDeleteSubject.bind(this);
		this.onSubmitUpdateProfile = this.onSubmitUpdateProfile.bind(this);
		this.onChangeQuery = this.onChangeQuery.bind(this);
		this.onChangeNewSubject = this.onChangeNewSubject.bind(this);
		this.onChangeDeleteSubject = this.onChangeDeleteSubject.bind(this);
		this.onMailboxClicked = this.onMailboxClicked.bind(this);
		this.commitChanges = this.commitChanges.bind(this);

		axios.get('http://localhost:5000/home/' + props.match.params.id).then((res) => {

			this.setState({
				username: res.data.username,
				password: res.data.password,
				isTutor: res.data.isTutor,
				subjects: res.data.subjects,
				firstName: res.data.firstName,
				lastName: res.data.lastName,
				dateOfBirth: Intl.DateTimeFormat('en-US', options).format(
					new Date(res.data.dateOfBirth)
				),
				joinDate: res.data.joinDate,
				gender: res.data.gender,
			});
		});

		axios.get('http://localhost:5000/appointment/' + props.match.params.id).then(res => {
			console.log(res);

			this.setState({
				data: res.data
			})
		})
	}

	showProfileModal = () => {
		this.setState({ showProfileEditModal: true });
	};

	hideProfileModal = () => {
		this.setState({
			showProfileEditModal: false,
		});
	};

	showTutorModal = () => {
		this.setState({ showTutorEditModal: true });
	};

	hideTutorModal = () => {
		this.setState({ showTutorEditModal: false });
	};

	onMailboxClicked(event) {
		this.props.history.push('/mailbox/' + sessionStorage.getItem('id'));
	}

	onChangeQuery(event) {
		this.setState({
			query: event.target.value,
		});
	}

	onChangeNewSubject(event) {
		this.setState({
			newSubject: event.target.value,
		});
	}

	onChangeDeleteSubject(event) {
		this.setState({
			deleteSubject: event.target.value,
		});
	}

	onChangeFirstName = (event) => {
		this.setState({
			firstName_temp: event.target.value,
		});
		this.idOfLastChangedElement = 'firstName';
	};

	onChangeLastName = (event) => {
		this.setState({
			lastName_temp: event.target.value,
		});
		this.idOfLastChangedElement = 'lastName';
	};

	onChangeUsername = (event) => {
		this.setState({
			username_temp: event.target.value,
		});
		this.idOfLastChangedElement = 'username';
	};

	handleDateChange = (date) => {
		this.setState({
			dateOfBirth_temp: format(date, 'MMMM dd, yyyy'),
		});
	};

	onChangeGender = (event) => {
		this.setState({
			gender_temp: event.target.value,
		});
	};

	onSubmit(event) {
		event.preventDefault();

		this.props.history.push('/search/' + this.state.query);
	}

	onSubmitNewSubject(event) {
		event.preventDefault();

		this.setState(
			{
				subjects: [...this.state.subjects, this.state.newSubject],
			},
			this.updateSubjectsCallback
		);
	}

	onSubmitDeleteSubject(event) {
		event.preventDefault();

		this.setState(
			{
				subjects: this.state.subjects.filter((elem) => elem !== this.state.deleteSubject),
			},
			this.updateSubjectsCallback
		);
	}

	onSubmitUpdateProfile(event) {
		event.preventDefault();

		this.setState(
			{
				firstName: this.state.firstName_temp,
				lastName: this.state.lastName_temp,
				dateOfBirth: this.state.dateOfBirth_temp,
				username: this.state.username_temp,
				gender: this.state.gender_temp,
			},
			this.updateProfileCallback
		);
	}

	updateProfileCallback = () => {
		axios.patch('http://localhost:5000/user/' + sessionStorage.getItem('id') + '/profile', {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			gender: this.state.gender,
			dateOfBirth: this.state.dateOfBirth,
			username: this.state.username,
		});
	};

	updateSubjectsCallback = () => {
		axios
			.patch('http://localhost:5000/user/' + sessionStorage.getItem('id') + '/subjects', {
				subjects: this.state.subjects,
			})
			.then((res) => {
				console.log(res);

				this.setState({
					deleteSubject: '',
					newSubject: '',
				});
			});
	};

	componentDidUpdate() {
		if (this.idOfLastChangedElement !== '' && this.state.showProfileEditModal) {
			document.getElementById(this.idOfLastChangedElement).focus();
		}
	}

	commitChanges({ added, changed, deleted }) {
	
		this.setState((state) => {
			let { data } = state;
			if (changed) {
				console.log(changed);
				
				data = data.map((appointment) =>
					changed[appointment.id]
						? { ...appointment, ...changed[appointment.id] }
						: appointment
				);

				let changedAppointment = data.filter((appointment) => appointment.id === Object.keys(changed)[0]);
				axios.patch('http://localhost:5000/appointment/' + Object.keys(changed)[0], {appointment: changedAppointment[0]}).then(result => {
					console.log(result);
				})
			}
			if (deleted !== undefined) {
				console.log(deleted);
				
				data = data.filter((appointment) => appointment.id !== deleted);
				axios.delete('http://localhost:5000/appointment/' + deleted);
			}
			return { data };
		});
	}

	render() {
		const { classes } = this.props;
		const { data } = this.state;

		let picturePath;
		if (this.state.gender === 'Male') {
			picturePath = 'DefaultProfilePictureMale.jpg';
		} else if (this.state.gender === 'Female') {
			picturePath = 'DefaultProfilePictureFemale.jpg';
		} else {
			picturePath = 'DefaultProfilePicture.jpg';
		}

		const messages = {
			moreInformationLabel: '',
		};

		const TextEditor = (props) => {
			console.log(props);

			if (props.type === 'multilineTextEditor') {
			  return null;
			} return <AppointmentForm.TextEditor {...props} />;
		};

		const BooleanEditor = (props) => {
			console.log(props);

			if (props.label === 'All Day' || props.label === 'Repeat') {
			  return null;
			} return <AppointmentForm.BooleanEditor {...props} />;
		};

		const EditButton = () => {
			if (this.state.isTutor) {
				return (
					<Button
						className={classes.userBoxButton}
						variant='outlined'
						onClick={this.showTutorModal}>
						Edit Subjects
					</Button>
				);
			} else {
				return null;
			}
		};

		const ProfileModal = () => {
			if (this.state.showProfileEditModal) {
				return (
					<div className={classes.modal}>
						<section className={classes.modalMain}>
							<Typography className={classes.modalText} variant='h6'>
								Edit Profile
							</Typography>
							<Button
								className={classes.modalCloseButton}
								onClick={this.hideProfileModal}
								startIcon={<CloseIcon />}></Button>
							<form
								className={classes.modalEditForm}
								onSubmit={this.onSubmitUpdateProfile}>
								<TextField
									id='firstName'
									className={classes.modalEditTextField}
									required
									variant='outlined'
									label='First Name'
									type='text'
									value={this.state.firstName_temp}
									onChange={this.onChangeFirstName}
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
								<TextField
									id='lastName'
									className={classes.modalEditTextField}
									required
									inputRef={this.textInput}
									variant='outlined'
									label='Last Name'
									type='text'
									value={this.state.lastName_temp}
									onChange={this.onChangeLastName}
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
								<TextField
									id='username'
									className={classes.usernameModalTextField}
									required
									variant='outlined'
									label='Username'
									type='text'
									value={this.state.username_temp}
									onChange={this.onChangeUsername}
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
								<Grid container className={classes.grid}>
									<Grid item xs={8}>
										<MuiPickersUtilsProvider utils={DateFnsUtils}>
											<KeyboardDatePicker
												inputVariant='outlined'
												variant='dialogue'
												DialogProps={{
													className: classes.calendar,
												}}
												className={classes.dateOfBirthModal}
												format='MM/dd/yyyy'
												margin='normal'
												label='Date of Birth'
												value={this.state.dateOfBirth_temp}
												onChange={this.handleDateChange}
											/>
										</MuiPickersUtilsProvider>
									</Grid>
									<Grid item xs={4}>
										<Select
											variant='outlined'
											className={classes.genderModal}
											onChange={this.onChangeGender}
											value={this.state.gender_temp}>
											<MenuItem key='Male' value='Male'>
												Male
											</MenuItem>
											<MenuItem key='Female' value='Female'>
												Female
											</MenuItem>
											<MenuItem key='Other' value='Other'>
												Other
											</MenuItem>
										</Select>
									</Grid>
								</Grid>
								<Button
									className={classes.editSubmitButton}
									variant='outlined'
									type='submit'
									startIcon={<SaveIcon />}>
									Save
								</Button>
							</form>
						</section>
					</div>
				);
			} else {
				return null;
			}
		};

		const TutorModal = () => {
			if (this.state.showTutorEditModal) {
				return (
					<div className={classes.modal}>
						<section className={classes.modalMain}>
							<Typography className={classes.modalText} variant='h6'>
								Edit Subject
							</Typography>
							<Button
								className={classes.modalCloseButton}
								onClick={this.hideTutorModal}
								startIcon={<CloseIcon />}></Button>
							<form className={classes.modalForm} onSubmit={this.onSubmitNewSubject}>
								<TextField
									className={classes.modalTextField}
									required
									autoFocus
									variant='outlined'
									label='New Subject'
									type='text'
									value={this.state.newSubject}
									onChange={this.onChangeNewSubject}
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
									className={classes.newSubjectButton}
									variant='outlined'
									type='submit'
									startIcon={<AddBoxIcon />}>
									Add
								</Button>
							</form>
							<form
								className={classes.modalForm}
								onSubmit={this.onSubmitDeleteSubject}>
								<InputLabel className={classes.selectLabel} id='select'>
									Delete Subject
								</InputLabel>
								<Select
									labelId='select'
									variant='outlined'
									className={classes.modalSelect}
									onChange={this.onChangeDeleteSubject}
									value={this.state.deleteSubject}>
									{this.state.subjects.map((subject) => (
										<MenuItem key={subject} value={subject}>
											{subject}
										</MenuItem>
									))}
								</Select>
								<Button
									className={classes.deleteSubjectButton}
									variant='outlined'
									type='submit'
									startIcon={<DeleteIcon />}>
									Delete
								</Button>
							</form>
						</section>
					</div>
				);
			} else {
				return null;
			}
		};

		return (
			<div>
				<form className={classes.form} onSubmit={this.onSubmit}>
					<TextField
						className={classes.textField}
						autoFocus
						variant='outlined'
						label='Search'
						type='text'
						value={this.state.query}
						onChange={this.onChangeQuery}
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
						value='Search'>
						Search
					</Button>
				</form>
				<Box className={classes.mainBox}>
					<Card className={classes.userBox}>
						<img
							className={classes.picture}
							src={require('../assets/' + picturePath)}
							alt=''
						/>
						<Grid
							container
							spacing={1}
							alignItems='flex-start'
							className={classes.userInfoGrid}>
							<Grid item xs={1}>
								<PeopleOutlineRoundedIcon />
							</Grid>
							<Grid item xs={11}>
								<Typography>
									{'Name: ' + this.state.firstName + ' ' + this.state.lastName}
								</Typography>
							</Grid>
							<Grid item xs={1}>
								<AssignmentIndIcon />
							</Grid>
							<Grid item xs={11}>
								<Typography>{'Username: ' + this.state.username}</Typography>
							</Grid>
							<Grid item xs={1}>
								<WcIcon />
							</Grid>
							<Grid item xs={11}>
								<Typography>{'Gender: ' + this.state.gender}</Typography>
							</Grid>
							<Grid item xs={1}>
								<EventIcon />
							</Grid>
							<Grid item xs={11}>
								<Typography>{'Join Date: ' + this.state.joinDate}</Typography>
							</Grid>
							<Grid item xs={1}>
								<CakeIcon />
							</Grid>
							<Grid item xs={11}>
								<Typography>{'Birthday: ' + this.state.dateOfBirth}</Typography>
							</Grid>
						</Grid>
						<Button
							className={classes.userBoxButton}
							onClick={this.onMailboxClicked}
							variant='outlined'>
							Mailbox
						</Button>
						<Button
							className={classes.userBoxButton}
							variant='outlined'
							onClick={this.showProfileModal}>
							Edit Profile
						</Button>
						<EditButton></EditButton>
					</Card>
					<Box className={classes.scheduleBox}>
						<Box className={classes.scheduleInnerBox}>
							<Scheduler className={classes.schedule} data={data}>
								<ViewState />
								<Toolbar />
								<DateNavigator />
								<EditingState onCommitChanges={this.commitChanges} />
								<WeekView startDayHour={0} endDayHour={24}/>
								<IntegratedEditing />
								<Appointments appointmentComponent={Appointment} />
								<AppointmentTooltip showCloseButton showOpenButton showDeleteButton/>
								<AppointmentForm textEditorComponent={TextEditor} booleanEditorComponent={BooleanEditor} messages={messages}/>
							</Scheduler>
						</Box>
					</Box>
				</Box>
				<ProfileModal show={this.state.showProfileEditModal}></ProfileModal>
				<TutorModal show={this.state.showTutorEditModal}></TutorModal>
			</div>
		);
	}
}

export default withStyles(styles)(HomeComponent);
