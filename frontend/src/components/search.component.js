import React, { Component } from 'react';
import axios from 'axios';

import { TextField, Button, withStyles, Typography } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import CloseIcon from '@material-ui/icons/Close';

const styles = {
	form: {
		marginTop: 56,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
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
		height: 40,
		width: '10%',
		marginRight: 16,
		marginLeft: 16,
		minHeight: '58px'
	},
	titleBar: {
		background:
			'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' +
			'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
	},
	gridList: {
		paddingTop: 32,
		paddingLeft: 16,
		paddingRight: 16,
		width: '98%',
		height: '80%'
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
		marginLeft: '44%',
		marginTop: '2%'
	},
};

class SearchComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			query: props.match.params.query,
			searchResults: [],
			showViewProfileModal: false
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.onChangeQuery = this.onChangeQuery.bind(this);
		this.onUserClicked = this.onUserClicked.bind(this);

		axios
			.get('http://localhost:5000/search/' + this.state.query)
			.then(res => {
				this.setState({
					searchResults: res.data
				});
			});
	}

	onChangeQuery(event) {
		this.setState({
			query: event.target.value
		});
	}

	onUserClicked(userId) {
		axios
			.get(
				'http://localhost:5000/mailbox/' +
					sessionStorage.getItem('id') +
					'/' +
					userId
			)
			.then(res => {
				if (res.data === null) {
					axios
						.post('http://localhost:5000/mailbox/', {
							participants: [sessionStorage.getItem('id'), userId]
						})
						.then(res => {
							this.props.history.push('/message/' + res.data);
						});
				} else {
					this.props.history.push('/message/' + res.data);
				}
			});
	}

	onSubmit(event) {
		event.preventDefault();
		this.props.history.push('/search/' + this.state.query);
	}

	showViewProfileModal = () => {
		this.setState({ showViewProfileModal: true });
	};

	hideViewProfileModal = () => {
		this.setState({ showViewProfileModal: false });
	};

	componentDidUpdate(prevProps) {
		if (this.props.match.params.query !== prevProps.match.params.query) {
			this.setState({
				query: ''
			});

			axios
				.get(
					'http://localhost:5000/search/' +
						this.props.match.params.query
				)
				.then(res => {
					this.setState({
						searchResults: res.data
					});
				});
		}
	}

	render() {
		const { classes } = this.props;

		const ViewProfileModal = () => {
			if (this.state.showViewProfileModal) {
				return (
					<div className={classes.modal}>
						<section className={classes.modalMain}>
							<Typography
								className={classes.modalText}
								variant='h6'>View Profile</Typography>
							<Button
								className={classes.modalCloseButton}
								onClick={this.hideViewProfileModal}
								startIcon={<CloseIcon />}></Button>
						</section>
					</div>
				);
			} else {
				return null;
			}
		};

		const Results = props => {
			if (this.state.searchResults.length < 1) {
				return null;
			}

			const options = props.results.map(result => {
				let picturePath;
				if (result.gender === 'Male') {
					picturePath = 'DefaultProfilePictureMale.jpg';
				} else if (result.gender === 'Female') {
					picturePath = 'DefaultProfilePictureFemale.jpg';
				} else {
					picturePath = 'DefaultProfilePicture.jpg';
				}

				return (
					<GridListTile
						key={result._id}
						//onClick={() => this.onUserClicked(result._id)}
						onClick={() => this.showViewProfileModal()}
						cols={1}
						rows={1}>
						<img
							src={require('../assets/' + picturePath)}
							alt='Profile'
						/>
						<GridListTileBar
							title={result.username}
							subtitle={
								'Name: ' +
								result.firstName +
								' ' +
								result.lastName
							}
						/>
					</GridListTile>
				);
			});

			return (
				<GridList
					cols={4}
					cellHeight={252}
					spacing={16}
					className={classes.gridList}>
					{options}
				</GridList>
			);
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
				<Results results={this.state.searchResults} />
				<ViewProfileModal
					show={this.state.showViewProfileModal}></ViewProfileModal>
			</div>
		);
	}
}

export default withStyles(styles)(SearchComponent);
