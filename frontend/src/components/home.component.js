import React, { Component } from "react";
import axios from "axios";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

export default class HomeComponent extends Component {
    constructor(props) {
        super(props);

        console.log(props.match.params.id);

        this.state = {
            username: "",
            password: "",
            isTutor: "",
            subjects: []
        };

        axios
            .get("http://localhost:5000/home/" + props.match.params.id)
            .then(res => {
                this.setState({
                    username: res.data.username,
                    password: res.data.password,
                    isTutor: res.data.isTutor,
                    subjects: res.data.subjects
                })
                console.log(this.state);
            });
    }

    render() {
        return (
            <Card>
                <CardContent>
                    {this.state.username}<br/>
                    {this.state.password}<br/>
                    {this.state.isTutor}<br/>
                    {this.state.subjects}<br/>
                </CardContent>
            </Card>
        );
    }
}
