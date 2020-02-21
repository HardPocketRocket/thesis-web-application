import React, { Component } from 'react';
import axios from 'axios';

import { withStyles, Box, Typography } from '@material-ui/core';

const socket = require('socket.io-client');
let socketClient;

const styles = {
	container: {
		marginTop: 48,
		display: 'flex',
		flexDirection: 'column',
		spacing: 2
	},
	sentMessage: {
		marginTop: 16,
		marginRight: 16,
		borderRadius: '12px',
		width: '40%',
		maxWidth: 400,
		minHeight: '32px',
		alignSelf: 'flex-end',
		background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
	},
	receivedMessage: {
		marginTop: 16,
		marginLeft: 16,
		borderRadius: '12px',
		width: '40%',
		maxWidth: 400,
		minHeight: '32px',
		alignSelf: 'flex-start',
		background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
	},
	text: {
		paddingLeft: '8px',
		paddingRight: '8px',
		paddingTop: '5px'
	}
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
			messageList: []
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.onChangeReceiver = this.onChangeReceiver.bind(this);
		this.onChangeMessage = this.onChangeMessage.bind(this);
		this.getReceiver = this.getReceiver.bind(this);

		socketClient = socket.connect('http://localhost:5000');
		socketClient.emit('login', this.state.id);

		socketClient.on('private', message => {
			this.setState(prevState => ({
				messageList: [...prevState.messageList, message]
			}));
			console.log(this.state.messageList);
		});

		axios
			.get('http://localhost:5000/message/' + this.state.mailboxId)
			.then(res => {
				this.setState({
					messageList: res.data
				});
			});

		axios
			.get(
				'http://localhost:5000/mailbox/' + sessionStorage.getItem('id')
			)
			.then(res => {
				const receiver = this.getReceiver(res.data[0].participants);

				this.setState({
					receiver: receiver
				});
			});
	}

	getReceiver(participants) {
		let receiver;

		participants.forEach(element => {
			if (element !== sessionStorage.getItem('id')) {
				receiver = element;
			}
		});
		return receiver;
	}

	onChangeReceiver(event) {
		this.setState({
			receiver: event.target.value
		});
	}

	onChangeMessage(event) {
		this.setState({
			message: event.target.value
		});
	}

	onSubmit(event) {
		event.preventDefault();

		const message = {
			mailboxId: this.state.mailboxId,
			to: this.state.receiver,
			from: sessionStorage.getItem('id'),
			message: this.state.message
		};

		axios.post('http://localhost:5000/message/', message).then(res => {
			axios.patch(
				'http://localhost:5000/mailbox/' + this.state.mailboxId,
				{ message: res.data }
			);
			this.setState({
				messageList: [...this.state.messageList, res.data]
			});

			socketClient.emit('private', res.data);

			console.log(this.state.messageList);
		});
	}

	render() {
		const { classes } = this.props;

		const Messages = props => {
			if (this.state.messageList.length < 1) {
				return null;
			}

			const texts = props.messages.map(message => {
				let messageClass;
				let textAlign;

				if (sessionStorage.getItem('id') === message.from) {
					messageClass = classes.sentMessage;
					textAlign = 'right'
				} else {
					messageClass = classes.receivedMessage;
					textAlign = 'left'
				}

				return (
					<Box textAlign={textAlign} className={messageClass} key={message._id}>
						<Typography className={classes.text}>{message.message}</Typography>
					</Box>
				);
			});

			return <Box className={classes.container}>{texts}</Box>;
		};

		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<br />
					<label>Message</label>
					<input
						type='text'
						value={this.state.message}
						onChange={this.onChangeMessage}
					/>
					<br />
					<input type='submit' value='Send' />
				</form>
				<Messages messages={this.state.messageList} />
			</div>
		);
	}
}

export default withStyles(styles)(MessageComponent);
