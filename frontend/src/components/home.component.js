import React, { Component } from 'react';
import axios from 'axios';

import Card from '@material-ui/core/Card';

import { TextField, Button, withStyles, Box } from '@material-ui/core';

const styles = {
	form: {
		marginTop: 56,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	mainBox: {
		background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
		marginLeft: 16,
		marginRight: 16,
		marginTop: 32,
		display: 'flex',
		flexDirection: 'row',
		height: '780px',
		borderRadius: '12px'
	},
	userBox: {
		width: '20%',
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
		background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
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
		height: '45%',
		marginLeft: 16,
		marginTop: 44,
		marginBottom: 8,
		marginRight: 16,
		borderRadius: '12px'
	},
	textField: {
		width: '90%',
		marginLeft: 16
	},
	outlinedRoot: {
		'&:hover $notchedOutline': {
			borderColor: '#FF8E53',
			borderWidth: 2
		},
		'&$focused $notchedOutline': {
			borderColor: '#FE6B8B',
			borderWidth: 2
		}
	},
	notchedOutline: {},
	focused: {},
	label: {
		'&$focusedLabel': {
			color: '#FE6B8B'
		}
	},
	focusedLabel: {},
	button: {
		background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
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
		background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
		border: 0,
		//color: 'white',
		width: '10%',
		marginRight: 16,
		marginLeft: 16,
		minHeight: '58px'
	},
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
			showTutorEditModal: false
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.onChangeQuery = this.onChangeQuery.bind(this);
		this.onMailboxClicked = this.onMailboxClicked.bind(this);

		axios
			.get('http://localhost:5000/home/' + props.match.params.id)
			.then(res => {
				console.log(res);
				this.setState({
					username: res.data.username,
					password: res.data.password,
					isTutor: res.data.isTutor,
					subjects: res.data.subjects
				});
			});
	}

	showModal = () => {
		this.setState({ showEditModal: true });
		console.log('showModal');
		
	};

	hideModal = () => {
		this.setState({ showEditModal: false });
		console.log('hideModal');
	};

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

	onSubmit(event) {
		event.preventDefault();

		this.props.history.push('/search/' + this.state.query);
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
						Edit Profile & Subjects
					</Button>
				);
			} else {
				return (
					<Button
						className={classes.userBoxButton}
						variant='outlined'
						onClick={this.showModal}>
						Edit Profile
					</Button>
				);
			}
		};

		const Modal = () => {
			if(this.state.showEditModal){
				return (
					<div className={classes.modal}>
						<section className={classes.modalMain}>
							<p>Normal Modal</p>
							<Button className={classes.modalCloseButton} onClick={this.hideModal}>Close</Button>
						</section>
					</div>
				);
			}

			if(this.state.showTutorEditModal){
				return (
					<div className={classes.modal}>
						<section className={classes.modalMain}>
							<p>Tutor Modal</p>
							<Button className={classes.modalCloseButton} onClick={this.hideTutorModal}>Close</Button>
						</section>
					</div>
				);
			}

			else {
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
						<Button
							className={classes.userBoxButton}
							onClick={this.onMailboxClicked}
							variant='outlined'>
							Mailbox
						</Button>
						<EditButton></EditButton>
					</Card>
					<Box className={classes.schedule}>Schedule Placeholder</Box>
				</Box>
				<Modal show={this.state.showEditModal}></Modal>
				<Modal show={this.state.showTutorEditModal}></Modal>
			</div>
		);
	}
}

export default withStyles(styles)(HomeComponent);
