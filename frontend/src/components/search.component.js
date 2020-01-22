import React, { Component } from "react";
import axios from "axios";

export default class HomeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTerm: "",
            searchResults: []
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeSearchTerm = this.onChangeSearchTerm.bind(this);
    }

    onChangeSearchTerm(event) {
        this.setState({
            searchTerm: event.target.value
        });
    }

    onSubmit(event) {
        event.preventDefault();

        axios
            .get("http://localhost:5000/search/" + this.state.searchTerm)
            .then(res => {
                this.setState({
                    searchResults: res.data
                });
                console.log(this.state);
            });
    }

    render() {
        const Results = props => {
            if (this.state.searchResults.length < 1) {
                return null;
            }

            const options = props.results.map(result => (
                <li>{result.username}</li>
            ));

            return <ul>{options}</ul>;
        };

        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        value={this.state.searchTerm}
                        onChange={this.onChangeSearchTerm}
                    />
                    <input type="submit" value="Search" />
                </form>
                <br />
                <Results results={this.state.searchResults}/>
            </div>
        );
    }
}
