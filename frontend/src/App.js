import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import HomeComponent from './components/home.component';
import LoginComponent from './components/login.component';
import RegisterComponent from './components/register.component';
import SearchComponent from './components/search.component';
import MessageComponent from './components/message.component';
import MailboxComponent from './components/mailbox.component';

class App extends Component {
	render() {
		return (
			<Router>
				{/* <Redirect exact from='' to='/register' /> */}
				<Route path='/login' exact component={LoginComponent} />
				<Route path='/register' exact component={RegisterComponent} />
				<Route path='/home/:id' exact component={HomeComponent} />
				<Route path='/message/:id' exact component={MessageComponent} />
				<Route path='/mailbox/:id' exact component={MailboxComponent} />
				<Route
					path='/search/:query?'
					exact
					component={SearchComponent}
				/>
			</Router>
		);
	}
}

export default App;
