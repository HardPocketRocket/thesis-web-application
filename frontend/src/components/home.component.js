import React, { Component } from 'react';
import axios from 'axios';

import Card from '@material-ui/core/Card';
import Select from '@material-ui/core/Select';

import MenuItem from '@material-ui/core/MenuItem';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import PeopleOutlineRoundedIcon from '@material-ui/icons/PeopleOutlineRounded';
import InputLabel from '@material-ui/core/InputLabel';

import {
	TextField,
	Button,
	withStyles,
	Box,
	Typography,
	Icon,
	Grid
} from '@material-ui/core';

const styles = {
	form: {
		marginTop: 40,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	mainBox: {
		background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
		marginLeft: 16,
		marginRight: 16,
		marginTop: 32,
		display: 'flex',
		flexDirection: 'row',
		height: '84vh',
		borderRadius: '12px'
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
		borderRadius: '12px'
	},
	schedule: {
		width: '80%',
		marginLeft: 24,
		marginRight: 24,
		marginTop: 24,
		marginBottom: 24,
		borderRadius: '12px',
		background: 'white',
		display: 'flex',
		flexDirection: 'row'
	},
	userBoxButton: {
		background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
		border: 0,
		color: 'white',
		height: 40,
		width: '80%',
		marginRight: 16,
		marginLeft: 16,
		marginTop: 24
	},
	picture: {
		width: '80%',
		height: '40%',
		marginLeft: 16,
		marginTop: 44,
		marginBottom: 16,
		marginRight: 16,
		borderRadius: '12px'
	},
	textField: {
		width: '90%',
		marginLeft: 16
	},
	outlinedRoot: {
		'&:hover $notchedOutline': {
			borderColor: '#2196F3',
			borderWidth: 2
		},
		'&$focused $notchedOutline': {
			borderColor: '#2196F3',
			borderWidth: 2
		}
	},
	notchedOutline: {},
	focused: {},
	label: {
		'&$focusedLabel': {
			color: '#2196F3'
		}
	},
	focusedLabel: {},
	button: {
		background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
		border: 0,
		color: 'white',
		width: '10%',
		marginRight: 16,
		marginLeft: 16,
		minHeight: '58px'
	},
	modal: {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		background: 'rgba(0, 0, 0, 0.6)',
		display: 'block'
	},
	modalMain: {
		borderRadius: 12,
		position: 'fixed',
		background: 'white',
		width: '50%',
		height: '40%',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%,-50%)'
	},
	modalCloseButton: {
		position: 'fixed',
		top: 10,
		right: 8,
		height: '8%',
		width: '8%'
	},
	modalText: {
		marginRight: '30%',
		marginLeft: '40%',
		marginTop: '2%'
	},
	newSubjectButton: {
		background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
		border: 0,
		color: 'white',
		width: '20%',
		height: '56px',
		marginLeft: '4%',
		marginRight: '2%'
	},
	deleteSubjectButton: {
		background: 'linear-gradient(45deg, #de161d 30%, #ff363d 90%)',
		border: 0,
		color: 'white',
		width: '20%',
		height: '56px',
		marginLeft: '4%',
		marginRight: '2%'
	},
	modalForm: {
		marginTop: 64
	},
	modalTextField: {
		width: '70%',
		marginLeft: '2%'
	},
	modalSelect: {
		width: '68%',
		marginLeft: '4%'
	},
	selectLabel: {
		marginLeft: '4%'
	},
	userInfoGrid: {
		marginLeft: '20%'
	}
};

class HomeComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			isTutor: '',
			subjects: [],
			query: '',
			showEditModal: false,
			showTutorEditModal: false,
			newSubject: '',
			deleteSubject: '',
			firstName: '',
			lastName: ''
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.onSubmitNewSubject = this.onSubmitNewSubject.bind(this);
		this.onSubmitDeleteSubject = this.onSubmitDeleteSubject.bind(this);
		this.onChangeQuery = this.onChangeQuery.bind(this);
		this.onChangeNewSubject = this.onChangeNewSubject.bind(this);
		this.onChangeDeleteSubject = this.onChangeDeleteSubject.bind(this);
		this.onMailboxClicked = this.onMailboxClicked.bind(this);

		axios
			.get('http://localhost:5000/home/' + props.match.params.id)
			.then(res => {
				console.log(res);
				this.setState({
					username: res.data.username,
					password: res.data.password,
					isTutor: res.data.isTutor,
					subjects: res.data.subjects,
					firstName: res.data.firstName,
					lastName: res.data.lastName
				});
			});
	}

	showTutorModal = () => {
		this.setState({ showTutorEditModal: true });
		console.log('showTutorModal');
	};

	hideTutorModal = () => {
		this.setState({ showTutorEditModal: false });
		console.log('hideTutorModal');
	};

	onMailboxClicked(event) {
		console.log('dasdfs');
		this.props.history.push('/mailbox/' + sessionStorage.getItem('id'));
	}

	onChangeQuery(event) {
		this.setState({
			query: event.target.value
		});
	}

	onChangeNewSubject(event) {
		this.setState({
			newSubject: event.target.value
		});
	}

	onChangeDeleteSubject(event) {
		this.setState({
			deleteSubject: event.target.value
		});
	}

	onSubmit(event) {
		event.preventDefault();

		this.props.history.push('/search/' + this.state.query);
	}

	onSubmitNewSubject(event) {
		event.preventDefault();

		this.setState({
			subjects: [...this.state.subjects, this.state.newSubject]
		});

		axios
			.patch(
				'http://localhost:5000/user/' + sessionStorage.getItem('id'),
				{ subject: this.state.newSubject }
			)
			.then(res => {
				console.log(res);

				this.setState({
					newSubject: ''
				});
			});
	}

	onSubmitDeleteSubject(event) {
		event.preventDefault();

		this.setState({
			subjects: this.state.subjects.filter(
				elem => elem !== this.state.deleteSubject
			)
		});

		axios
			.patch(
				'http://localhost:5000/user/' +
					sessionStorage.getItem('id') +
					'/subjects',
				{ subject: this.state.deleteSubject }
			)
			.then(res => {
				console.log(res);

				this.setState({
					deleteSubject: ''
				});
			});
	}

	render() {
		const { classes } = this.props;

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

		const Modal = () => {
			if (this.state.showTutorEditModal) {
				return (
					<div className={classes.modal}>
						<section className={classes.modalMain}>
							<Typography
								className={classes.modalText}
								variant='h6'>
								Edit Subject
							</Typography>
							<Button
								className={classes.modalCloseButton}
								onClick={this.hideTutorModal}
								startIcon={<CloseIcon />}></Button>
							<form
								className={classes.modalForm}
								onSubmit={this.onSubmitNewSubject}>
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
											notchedOutline:
												classes.notchedOutline,
											focused: classes.focused
										}
									}}
									InputLabelProps={{
										classes: {
											root: classes.label,
											focused: classes.focusedLabel
										},
										required: false
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
								<InputLabel
									className={classes.selectLabel}
									id='select'>
									Delete Subject
								</InputLabel>
								<Select
									labelId='select'
									className={classes.modalSelect}
									onChange={this.onChangeDeleteSubject}
									value={this.state.deleteSubject}>
									{this.state.subjects.map(subject => (
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
								focused: classes.focused
							}
						}}
						InputLabelProps={{
							classes: {
								root: classes.label,
								focused: classes.focusedLabel
							},
							required: false
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
							src={require('../assets/DefaultProfilePicture.jpg')}
							alt=''
						/>
						<Grid container spacing={1} className={classes.userInfoGrid}>
							<Grid item>
								<PeopleOutlineRoundedIcon />
							</Grid>
							<Grid item >
								<Typography>
									{this.state.firstName +
										' ' +
										this.state.lastName}
								</Typography>
							</Grid>
						</Grid>
						<Button
							className={classes.userBoxButton}
							onClick={this.onMailboxClicked}
							variant='outlined'>
							Mailbox
						</Button>
						<EditButton></EditButton>
					</Card>
					<Box className={classes.schedule}></Box>
				</Box>
				<Modal show={this.state.showEditModal}></Modal>
				<Modal show={this.state.showTutorEditModal}></Modal>
			</div>
		);
	}
}

export default withStyles(styles)(HomeComponent);
