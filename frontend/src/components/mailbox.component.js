import React, { Component } from 'react';
import axios from 'axios';

import {
	List,
	ListItem,
	withStyles,
	Box,
	ListItemIcon,
	ListItemText,
	Typography
} from '@material-ui/core';
import DraftsIcon from '@material-ui/icons/Drafts';

const styles = {
	root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	title: {
		marginTop: 256
	},
	mailboxBox: {
		width: '40%',
		maxHeight: '60%',
		overflow: 'auto',
		marginBottom: 256,
		marginTop: 16,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
		borderRadius: '16px',
	},
	list: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '100%',
		padding: 0,
		margin: 4
	},
	listItem: {
		width: '94%',
		background: 'white',
		borderRadius: '12px',
		marginTop: 8,
		marginBottom: 8
	}
};

class MailboxComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			mailboxes: []
		};

		this.onMailboxClicked = this.onMailboxClicked.bind(this);
		this.getReceiver = this.getReceiver.bind(this);

		axios
			.get(
				'http://localhost:5000/mailbox/' + sessionStorage.getItem('id')
			)
			.then(res => {
				let mailboxes = res.data;

				let arrayOfPromises = mailboxes.map(mailbox => {
					return axios.get(
						'http://localhost:5000/user/' +
							this.getReceiver(mailbox.participants)
					);
				});

				Promise.all(arrayOfPromises).then(users => {
					this.setState({
						mailboxes: mailboxes.map((mailbox, index) => {
							return {
								mailbox: mailbox,
								user: users[index].data
							};
						})
					});
				});
			});
	}

	onMailboxClicked(mailboxId) {
		this.props.history.push('/message/' + mailboxId);
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

	render() {
		const { classes } = this.props;

		const Mailbox = props => {
			if (this.state.mailboxes.length < 1) {
				return null;
			}

			const mailboxes = props.mailboxes.map(obj => (
				<ListItem
					className={classes.listItem}
					button
					key={obj.mailbox._id}
					onClick={() => this.onMailboxClicked(obj.mailbox._id)}>
					<ListItemIcon>
						<DraftsIcon />
					</ListItemIcon>
					<ListItemText>{obj.user.username}</ListItemText>
				</ListItem>
			));

			return (
				<Box className={classes.mailboxBox}>
					<List className={classes.list}>{mailboxes}</List>
				</Box>
			);
		};

		return (
			<div className={classes.root}>
				<Typography className={classes.title} component='h1' variant='h5'>
					Mailbox
				</Typography>
				<Mailbox mailboxes={this.state.mailboxes} />
			</div>
		);
	}
}

export default withStyles(styles)(MailboxComponent);
