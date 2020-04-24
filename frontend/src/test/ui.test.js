import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Router, MemoryRouter } from 'react-router-dom';
import { configure, shallow, mount, render } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import App from '../App';
import Adapter from 'enzyme-adapter-react-16';

import {
	TextField,
	Button,
	Typography,
	withStyles,
	InputAdornment,
	LinearProgress,
} from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import HomeComponent from '../components/home.component';
import LoginComponent from '../components/login.component';
import RegisterComponent from '../components/register.component';
import SearchComponent from '../components/search.component';
import MessageComponent from '../components/message.component';
import MailboxComponent from '../components/mailbox.component';
import { Scheduler } from '@devexpress/dx-react-scheduler';

configure({ adapter: new Adapter() });

//Tests Routing in the App Component

describe('<App />', function () {
	it('render the register route', function () {
		const wrapper = shallow(<App />);
		const register = <Route path='/register' exact component={RegisterComponent} />;
		expect(wrapper.contains(register)).to.equal(true);
	});

	it('render the login route', function () {
		const wrapper = shallow(<App />);
		const login = <Route path='/login' exact component={LoginComponent} />;
		expect(wrapper.contains(login)).to.equal(true);
	});

	it('render the home route', function () {
		const wrapper = shallow(<App />);
		const home = <Route path='/home/:id' exact component={HomeComponent} />;
		expect(wrapper.contains(home)).to.equal(true);
	});

	it('render the search route', function () {
		const wrapper = shallow(<App />);
		const search = <Route path='/search/:query?' exact component={SearchComponent} />;
		expect(wrapper.contains(search)).to.equal(true);
	});

	it('render the message route', function () {
		const wrapper = shallow(<App />);
		const message = <Route path='/message/:id' exact component={MessageComponent} />;
		expect(wrapper.contains(message)).to.equal(true);
	});

	it('render the mailbox route', function () {
		const wrapper = shallow(<App />);
		const mailbox = <Route path='/mailbox/:id' exact component={MailboxComponent} />;
		expect(wrapper.contains(mailbox)).to.equal(true);
	});
});

//  Login Component Tests

describe('<LoginComponent />', () => {
	it('renders title', () => {
		const wrapper = mount(
			<MemoryRouter>
				<LoginComponent />
			</MemoryRouter>
		);
		expect(
			wrapper.contains(
				<Typography component='h1' variant='h5'>
					Sign in
				</Typography>
			)
		).to.equal(true);
	});

	it('checks number of rendered textfields', () => {
		const wrapper = mount(
			<MemoryRouter>
				<LoginComponent />
			</MemoryRouter>
		);
		expect(wrapper.find(TextField)).to.have.lengthOf(2);
	});

	it('checks number of rendered buttons', () => {
		const wrapper = mount(
			<MemoryRouter>
				<LoginComponent />
			</MemoryRouter>
		);
		expect(wrapper.find(Button)).to.have.lengthOf(1);
	});

	it('renders the form', () => {
		const wrapper = mount(
			<MemoryRouter>
				<LoginComponent />
			</MemoryRouter>
		);
		expect(wrapper.find('form')).to.have.lengthOf(1);
	});
});

//  Register Component Tests

describe('<RegisterComponent />', () => {
	it('checks number of rendered textfields', () => {
		const wrapper = mount(
			<MemoryRouter>
				<RegisterComponent />
			</MemoryRouter>
		);
		expect(wrapper.find(TextField)).to.have.lengthOf(5);
	});

	it('checks number of rendered buttons', () => {
		const wrapper = mount(
			<MemoryRouter>
				<RegisterComponent />
			</MemoryRouter>
		);
		expect(wrapper.find(Button)).to.have.lengthOf(1);
	});

	it('checks that the date picker is rendered', () => {
		const wrapper = mount(
			<MemoryRouter>
				<RegisterComponent />
			</MemoryRouter>
		);
		expect(wrapper.find(KeyboardDatePicker)).to.have.lengthOf(1);
	});

	it('renders the form', () => {
		const wrapper = mount(
			<MemoryRouter>
				<RegisterComponent />
			</MemoryRouter>
		);
		expect(wrapper.find('form')).to.have.lengthOf(1);
	});

	it('renders the password strength checker', () => {
		const wrapper = mount(
			<MemoryRouter>
				<RegisterComponent />
			</MemoryRouter>
		);
		expect(wrapper.find(LinearProgress)).to.have.lengthOf(1);
	});
});

//  Home Component Tests

describe('<HomeComponent />', () => {
	it('checks number of textfields (modal inactive) ', () => {
		const wrapper = shallow(<HomeComponent />);
		expect(wrapper.find(TextField)).to.have.lengthOf(0);
	});

	it('checks that the schedule renders', () => {
		const match = {
			params: {
				id: '5e8f27e4122ae024bc3bee2f',
			},
		};

		const wrapper = mount(<HomeComponent match={match} />);
		expect(wrapper.find(Scheduler)).to.have.lengthOf(1);
	});

	it('checks the picture gets rendered', () => {
		const match = {
			params: {
				id: '5e8f27e4122ae024bc3bee2f',
			},
		};

		const wrapper = mount(<HomeComponent match={match} />);
		expect(wrapper.find('img')).to.have.lengthOf(1);
	});
});

//  Search Component Tests

describe('<SearchComponent />', () => {
	it('checks the search field renders', () => {
		const match = {
			params: {
				query: 'Math',
			},
		};

		const wrapper = mount(<SearchComponent match={match} />);
		expect(wrapper.find(TextField)).to.have.lengthOf(1);
	});

	it('checks the search button renders', () => {
		const match = {
			params: {
				query: 'Math',
			},
		};

		const wrapper = mount(<SearchComponent match={match} />);
		expect(wrapper.find(Button)).to.have.lengthOf(1);
	});
});
