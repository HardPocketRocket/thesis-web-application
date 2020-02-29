import React, { Component } from "react";
import axios from "axios";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

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

class HomeComponent extends Component {
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

    onMailboxClicked(event) {
        console.log("dasdfs");
        this.props.history.push("/mailbox/" + sessionStorage.getItem("id"));
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
        const { classes } = this.props;

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
                <button onClick={this.onMailboxClicked}>Mailbox</button>
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

export default withStyles(styles)(HomeComponent);