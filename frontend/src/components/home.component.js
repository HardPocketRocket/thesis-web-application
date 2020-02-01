import React, { Component } from "react";
import axios from "axios";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

export default class HomeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            isTutor: "",
            subjects: [],
            query: ""
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeQuery = this.onChangeQuery.bind(this);
        this.onMailboxClicked = this.onMailboxClicked.bind(this);

        axios
            .get("http://localhost:5000/home/" + props.match.params.id)
            .then(res => {
                console.log(res);
                this.setState({
                    username: res.data.username,
                    password: res.data.password,
                    isTutor: res.data.isTutor,
                    subjects: res.data.subjects
                });
            });
    }

    onMailboxClicked() {
        this.props.history.push("/mailbox/");
    }

    onChangeQuery(event) {
        this.setState({
            query: event.target.value
        });
    }

    onSubmit(event) {
        event.preventDefault();

        this.props.history.push("/search/" + this.state.query);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        value={this.state.query}
                        onChange={this.onChangeQuery}
                    />
                    <input type="submit" value="Search" />
                </form>
                <button onClick={this.onMailBoxClicked}>Mailbox</button>
                <Card>
                    <CardContent>
                        {this.state.username}
                        <br />
                        {this.state.password}
                        <br />
                        {this.state.isTutor}
                        <br />
                        {this.state.subjects}
                        <br />
                    </CardContent>
                </Card>
            </div>
        );
    }
}
