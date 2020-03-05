import React, { Component } from 'react';
import axios from 'axios';

import {
	TextField,
	Button,
	Typography,
	withStyles,
	RadioGroup,
	FormControlLabel,
	Radio,
	Box,
	LinearProgress
} from '@material-ui/core';

const styles = {
	form: {
		marginTop: 300,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	nameBox: {
		width: '30%',
		display: 'flex',
		flexDirection: 'row'
	},
	radioForm: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	textField: {
		width: '30%',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: 8,
		marginBottom: 8
	},
	progress: {
		width: '30%',
		height: '8px',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: 16,
		marginBottom: 16,
		backgroundColor: '#cbcbcb'
	},
	colorPrimary: {
		backgroundColor: '#c1c1c1'
	},
	barColorPrimary1: {
		backgroundColor: '#ff2929'
	},
	barColorPrimary2: {
		backgroundColor: '#ff9326'
	},
	barColorPrimary3: {
		backgroundColor: '#fcdd12'
	},
	barColorPrimary4: {
		backgroundColor: '#bbff00'
	},
	barColorPrimary5: {
		backgroundColor: '#77ff00'
	},
	firstNameTextField: {
		width: '50%',
		marginRight: 8,
		marginTop: 8,
		marginBottom: 8
	},
	lastNameTextField: {
		width: '50%',
		marginLeft: 8,
		marginTop: 8,
		marginBottom: 8
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
		height: 40,
		width: '30%',
		marginTop: 8
	}
};

class RegisterComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			firstName: '',
			lastName: '',
			isTutor: 'false',
			subjects: [],
			passwordStrength: 0
		};

		//binding the functions this to the class' this
		this.checkPasswordStrength = this.checkPasswordStrength.bind(this);
		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
		this.onChangeFirstName = this.onChangeFirstName.bind(this);
		this.onChangeLastName = this.onChangeLastName.bind(this);
		this.onChangeIsTutor = this.onChangeIsTutor.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	hasLowerCase(str) {
		return str.toUpperCase() !== str;
	}

	hasUpperCase(str) {
		return str.toLowerCase() !== str;
	}

	hasNumbers(str) {
		return /\d/.test(str);
	}

	hasSpecialCharacters(str) {
		return /[\s~`!@#$%^&*+=\-[\]';,/{}|":<>?()._]/g.test(str);
	}

	checkPasswordStrength(str) {
		let strengthNum = 0;

		if (this.hasLowerCase(str)) {
			strengthNum++;
		}
		if (this.hasUpperCase(str)) {
			strengthNum++;
		}
		if (this.hasNumbers(str)) {
			strengthNum++;
		}
		if (this.hasSpecialCharacters(str)) {
			strengthNum++;
		}
		if (str.length >= 8) {
			strengthNum++;
		}

		return strengthNum;
	}

	onChangeUsername(event) {
		this.setState({
			username: event.target.value
		});
	}

	onChangePassword(event) {
		let strengthNum = this.checkPasswordStrength(event.target.value);
		this.setState({
			password: event.target.value,
			passwordStrength: strengthNum
		});
	}

	onChangeFirstName(event) {
		this.setState({
			firstName: event.target.value
		});
	}

	onChangeLastName(event) {
		this.setState({
			lastName: event.target.value
		});
	}

	onChangeIsTutor(event) {
		this.setState({
			isTutor: event.target.value
		});
	}

	onSubmit(event) {
		event.preventDefault();

		//User created with password + username to be passed in a request
		const user = {
			username: this.state.username,
			password: this.state.password,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			isTutor: this.state.isTutor,
			subjects: this.state.subjects
		};

		console.log(user);

		axios.post('http://localhost:5000/register', user).then(res => {
			if (res.status === 200) {
				this.props.history.push('/home/' + res.data);
			}
		});
	}

	render() {
		const { classes } = this.props;
		
		let barColorClass;

		switch (this.state.passwordStrength) {
			case 1:
				barColorClass = classes.barColorPrimary1
				break;
			case 2:
				barColorClass = classes.barColorPrimary2
				break;
			case 3:
				barColorClass = classes.barColorPrimary3
				break;
			case 4:
				barColorClass = classes.barColorPrimary4
				break;
			case 5:
				barColorClass = classes.barColorPrimary5
				break;
			default:
				barColorClass = classes.barColorPrimary1
				break;
		}

		return (
			<div>
				<form className={classes.form} onSubmit={this.onSubmit}>
					<Typography component='h1' variant='h5'>
						Register
					</Typography>
					<TextField
						className={classes.textField}
						required
						autoFocus
						variant='outlined'
						label='Username'
						type='text'
						value={this.state.username}
						onChange={this.onChangeUsername}
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
					<TextField
						className={classes.textField}
						required
						autoFocus
						variant='outlined'
						label='Password'
						type='password'
						value={this.state.password}
						onChange={this.onChangePassword}
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
					<LinearProgress
						className={classes.progress}
						classes={{
							colorPrimary: classes.colorPrimary,
							barColorPrimary: barColorClass
						}}
						value={this.state.passwordStrength * 20}
						variant='determinate'
					/>
					<Box className={classes.nameBox}>
						<TextField
							className={classes.firstNameTextField}
							required
							autoFocus
							variant='outlined'
							label='First Name'
							type='text'
							value={this.state.firstName}
							onChange={this.onChangeFirstName}
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
						<TextField
							className={classes.lastNameTextField}
							required
							autoFocus
							variant='outlined'
							label='Last Name'
							type='text'
							value={this.state.lastName}
							onChange={this.onChangeLastName}
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
					</Box>
					<RadioGroup
						className={classes.radioForm}
						name='isTutor'
						value={this.state.isTutor}
						onChange={this.onChangeIsTutor}>
						<FormControlLabel
							value='true'
							control={<Radio />}
							label='Tutor'
						/>
						<FormControlLabel
							value='false'
							control={<Radio />}
							label='Student'
						/>
					</RadioGroup>
					<Button
						className={classes.button}
						variant='outlined'
						type='submit'
						value='submit'>
						Register
					</Button>
				</form>
			</div>
		);
	}
}

export default withStyles(styles)(RegisterComponent);
