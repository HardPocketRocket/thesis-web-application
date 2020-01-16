import React, { Component } from "react";

export default class HomeComponent extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }
    
    render() {
        return (
            <div>
                <p>You are on the Home Component</p>
            </div>
        );
    }
}
