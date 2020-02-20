import React, { Component } from 'react';
import axios from 'axios';

const socket = require('socket.io-client');
let socketClient;

export default class MessageComponent extends Component {
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
		const Messages = props => {
			if (this.state.messageList.length < 1) {
				return null;
			}

			const texts = props.messages.map(message => (
				<li key={message._id}>{message.message}</li>
			));

			return <ul>{texts}</ul>;
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
				<br />
				<br />
				<Messages messages={this.state.messageList} />
			</div>
		);
	}
}
