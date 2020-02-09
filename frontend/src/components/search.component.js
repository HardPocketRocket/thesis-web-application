import React, { Component } from 'react';
import axios from 'axios';

export default class SearchComponent extends Component {
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
				<form onSubmit={this.onSubmit}>
					<input
						type='text'
						value={this.state.query}
						onChange={this.onChangeQuery}
					/>
					<input type='submit' value='Search' />
				</form>
				<br />
				<Results results={this.state.searchResults} />
			</div>
		);
	}
}
