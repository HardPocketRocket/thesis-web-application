import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import axios from 'axios';

import { TextField, Button, Typography, withStyles, InputAdornment } from '@material-ui/core';
import PeopleOutlineRoundedIcon from '@material-ui/icons/PeopleOutlineRounded';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';

const styles = {
	form: {
		marginTop: 300,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	textField: {
		width: '30%',
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
		marginTop: 8,
		marginBottom: 16
	}
};

class LoginComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: ''
		};

		//binding the functions this to the class' this
		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChangeUsername(event) {
		this.setState({
			username: event.target.value
		});
	}

	onChangePassword(event) {
		this.setState({
			password: event.target.value
		});
	}

	onSubmit(event) {
		event.preventDefault();

		//User created with password + username to be passed in a request
		const user = {
			username: this.state.username,
			password: this.state.password
		};

		axios.post('http://localhost:5000/login', user).then(res => {
			if (res.status === 200) {
				sessionStorage.setItem('id', res.data);
				this.props.history.push('/home/' + res.data);
			}
		});
	}

	render() {
		const { classes } = this.props;

		return (
			<div>
				<form className={classes.form} onSubmit={this.onSubmit}>
					<Typography component='h1' variant='h5'>
						Sign in
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
							},
							startAdornment: (
								<InputAdornment position="start">
								  <PeopleOutlineRoundedIcon/>
								</InputAdornment>
							)
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
							},
							startAdornment: (
								<InputAdornment position="start">
								  <LockOpenRoundedIcon/>
								</InputAdornment>
							)
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
						value='submit'>
						Sign In
					</Button>
					<RouterLink to='/register'>
						Don't have an account? Register
					</RouterLink>
				</form>
			</div>
		);
	}
}

export default withStyles(styles)(LoginComponent);
