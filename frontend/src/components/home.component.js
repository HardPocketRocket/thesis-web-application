import React, { Component } from "react";
import axios from "axios";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const socket = require("socket.io-client");
let socketClient;

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

        axios
            .get("http://localhost:5000/home/" + props.match.params.id)
            .then(res => {
                this.setState({
                    username: res.data.username,
                    password: res.data.password,
                    isTutor: res.data.isTutor,
                    subjects: res.data.subjects
                });

                socketClient = socket.connect("http://localhost:5000");
                socketClient.emit("login", this.state.username);
            });
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
