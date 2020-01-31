import React, { Component } from "react";
import axios from "axios";

export default class MailboxComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mailboxes: []
        };

        axios
            .get(
                "http://localhost:5000/mailbox/" + sessionStorage.getItem("id")
            )
            .then(res => {
                this.setState({ mailboxes: res.data });
            });
    }

    onMailboxClicked(mailboxId) {
        this.props.history.push("/message/" + mailboxId);
    }

    render() {
        const Mailbox = props => {
            if (this.state.mailboxes.length < 1) {
                return null;
            }

            const mailboxes = props.mailboxes.map(mailboxes => (
                <li onClick={this.onMailboxClicked(mailboxes.id)}>
                    {mailboxes.messageFrom}
                </li>
            ));

            return <ul>{mailboxes}</ul>;
        };

        return (
            <div>
                <Mailbox mailboxes={this.state.mailboxes} />
            </div>
        );
    }
}
