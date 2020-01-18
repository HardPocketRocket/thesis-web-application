import React, { Component } from "react";
import axios from "axios";

export default class RegisterComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            isTutor: "false",
            subjects: []
        };

        //binding the functions this to the class' this
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeIsTutor = this.onChangeIsTutor.bind(this);
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

    onChangeIsTutor(event) {
        this.setState({
            isTutor: event.target.value
        });
    }

    onSubmit(event) {
        event.preventDefault();

        //User created with password + username to be passed in a request
        const user = {
            username: this.state.username,
            password: this.state.password,
            isTutor: this.state.isTutor,
            subjects: this.state.subjects
        };

        console.log(user);

        axios.post("http://localhost:5000/register", user).then(res => {
            if (res.status === 200) {
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
                    <div className="radio">
                        <label>
                            <input
                                type="radio"
                                value={"false"}
                                checked={this.state.isTutor === "false"}
                                onChange={this.onChangeIsTutor}
                            />
                            Student
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input
                                type="radio"
                                value={"true"}
                                checked={this.state.isTutor === "true"}
                                onChange={this.onChangeIsTutor}
                            />
                            Teacher
                        </label>
                    </div>
                    <input type="submit" value="submit" />
                </form>
            </div>
        );
    }
}
