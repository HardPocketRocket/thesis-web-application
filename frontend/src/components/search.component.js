import React, { Component } from 'react';
import axios from 'axios';

import { TextField, Button, withStyles} from '@material-ui/core';

const styles = {
	form: {
		marginTop: 56,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	textField: {
		width: '90%',
		marginLeft: 16,
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
		'&$focusedLabel':{
			color: '#FE6B8B',
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
	}
};

class SearchComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			query: props.match.params.query,
			searchResults: []
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

		const Results = props => {
			if (this.state.searchResults.length < 1) {
				return null;
			}

			const options = props.results.map(result => (
				<li
					key={result._id}
					onClick={() => this.onUserClicked(result._id)}>
					{result.username}
				</li>
			));

			return <ul>{options}</ul>;
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
			</div>
		);
	}
}

export default withStyles(styles)(SearchComponent);