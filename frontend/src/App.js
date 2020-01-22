import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import HomeComponent from "./components/home.component";
import LoginComponent from "./components/login.component";
import RegisterComponent from "./components/register.component";
import SearchComponent from "./components/search.component";

class App extends Component {
    render() {
        return (
            <Router>
                <Route path="/login" exact component={LoginComponent} />
                <Route path="/register" exact component={RegisterComponent} />
                <Route path="/home/:id" exact component={HomeComponent} />
                <Route path="/search/:query" exact component={SearchComponent}/>

                <div className="container">
                    <h2>Components</h2>
                    <ul>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </ul>
                </div>
            </Router>
        );
    }
}

export default App;
