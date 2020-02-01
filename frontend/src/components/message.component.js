import React, { Component } from "react";
import axios from "axios";

const socket = require("socket.io-client");
let socketClient;

export default class MessageComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: sessionStorage.getItem("id"),
            mailboxId: props.match.params.id,
            receiver: "",
            sender: sessionStorage.getItem("id"),
            message: "",
            messageList: []
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeReceiver = this.onChangeReceiver.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);

        socketClient = socket.connect("http://localhost:5000");
        socketClient.emit("login", this.state.id);

        socketClient.on("private", data => {
            console.log(data);
            this.setState(prevState => ({
                messageList: [...prevState.messageList, data]
            }));
        });

        axios
            .get("http://localhost:5000/message/" + this.state.mailboxId)
            .then(res => {
                this.setState({
                    messageList: res.data
                });
            });
    }

    onChangeReceiver(event) {
        this.setState({
            receiver: event.target.value
        });
    }

    onChangeMessage(event) {
        this.setState({
            message: event.target.value
        });
    }

    onSubmit(event) {
        event.preventDefault();

        socketClient.emit("private", {
            receiver: this.state.receiver,
            message: this.state.message
        });

        const message = {
            mailboxId: this.state.mailboxId,
            to: this.state.receiver,
            from: sessionStorage.getItem("id"),
            message: this.state.message
        }

        axios
            .post("http://localhost:5000/message/", message)
            .then(res => {
                axios.patch("http://localhost:5000/mailbox/" + this.state.mailboxId, {message: res.data})
            });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <label>To</label>
                    <input
                        type="text"
                        value={this.state.reciever}
                        onChange={this.onChangeReceiver}
                    />
                    <br />
                    <label>Message</label>
                    <input
                        type="text"
                        value={this.state.message}
                        onChange={this.onChangeMessage}
                    />
                    <br />
                    <input type="submit" value="Send" />
                </form>
            </div>
        );
    }
}
