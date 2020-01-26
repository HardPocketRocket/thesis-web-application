import React, { Component } from "react";
import axios from "axios";

export default class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        };

        //binding the functions this to the class' this
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeUsername(event) {
        this.setState({
            username: event.target.value
        });
    }

    onChangePassword(event) {
        this.setState({
            password: event.target.value
        });
    }

    onSubmit(event) {
        event.preventDefault();

        //User created with password + username to be passed in a request
        const user = {
            username: this.state.username,
            password: this.state.password
        };

        axios.post("http://localhost:5000/login", user).then(res => {
            if(res.status === 200){
                sessionStorage.setItem("id", res.data)
                this.props.history.push("/home/" + res.data);
            }
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <label>Username: </label>
                    <input
                        type="text"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                    />
                    <br />
                    <label>Password: </label>
                    <input
                        type="password"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                    />
                    <br />
                    <input type="submit" value="submit" />
                </form>
            </div>
        );
    }
}
