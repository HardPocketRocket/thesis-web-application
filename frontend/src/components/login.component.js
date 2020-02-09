import React, { Component } from 'react';
import axios from 'axios';

import '../css/login.css'

import { TextField, Button, Typography } from '@material-ui/core';

export default class LoginComponent extends Component {
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
		return (
			<div className="Centered">
				<Typography component='h1' variant='h5'>
					Sign in
				</Typography>
				<form className="Form" onSubmit={this.onSubmit}>
					<TextField
						className='Input'
						required
						autoFocus
						variant='outlined'
						label='Username'
						type='text'
						value={this.state.username}
						onChange={this.onChangeUsername}
					/>
					<TextField
						className='Input'
						required
						autoFocus
						variant='outlined'
						label='Password'
						type='password'
						value={this.state.password}
						onChange={this.onChangePassword}
					/>
					<Button className="Button" variant="outlined" type='submit' value='submit'>Sign In</Button>
				</form>
			</div>
		);
	}
}
