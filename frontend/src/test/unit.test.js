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
import searchComponent from '../components/search.component';

configure({ adapter: new Adapter() });

//  Register Component Tests

describe('<RegisterComponent />', () => {

    it('tests password strength (weak)', () => {

		const wrapper = shallow(<RegisterComponent/>);
		const newWrapper = wrapper.dive();

        const instance = newWrapper.instance();
        
		expect(instance.checkPasswordStrength('a')).to.equal(1);
    });

    it('tests password strength (strong)', () => {

		const wrapper = shallow(<RegisterComponent/>);
		const newWrapper = wrapper.dive();

        const instance = newWrapper.instance();
        
		expect(instance.checkPasswordStrength('aBccc6&hh')).to.equal(5);
    });
    
});

//  Home Component Tests

describe('<HomeComponent />', () => {

	it('checks that showing profile modal works', () => {
		const match = {
			params: {
				id: '5e8f27e4122ae024bc3bee2f',
			},
		};

		const wrapper = shallow(<HomeComponent match={match} />);
		const newWrapper = wrapper.dive();

		const instance = newWrapper.instance();

		expect(newWrapper.state('showProfileEditModal')).to.equal(false);
		instance.showProfileModal();
		expect(newWrapper.state('showProfileEditModal')).to.equal(true);
	});

	it('checks that hiding profile modal work', () => {
		const match = {
			params: {
				id: '5e8f27e4122ae024bc3bee2f',
			},
		};

		const wrapper = shallow(<HomeComponent match={match} />);
		const newWrapper = wrapper.dive();

		const instance = newWrapper.instance();

		expect(newWrapper.state('showProfileEditModal')).to.equal(false);
		instance.showProfileModal();
		expect(newWrapper.state('showProfileEditModal')).to.equal(true);
		instance.hideProfileModal();
		expect(newWrapper.state('showProfileEditModal')).to.equal(false);
    });
    
    it('checks that showing tutor modal works', () => {
		const match = {
			params: {
				id: '5e8f27e4122ae024bc3bee2f',
			},
		};

		const wrapper = shallow(<HomeComponent match={match} />);
		const newWrapper = wrapper.dive();

		const instance = newWrapper.instance();

		expect(newWrapper.state('showTutorEditModal')).to.equal(false);
		instance.showTutorModal();
		expect(newWrapper.state('showTutorEditModal')).to.equal(true);
	});

	it('checks that hiding tutor modal works', () => {
		const match = {
			params: {
				id: '5e8f27e4122ae024bc3bee2f',
			},
		};

		const wrapper = shallow(<HomeComponent match={match} />);
		const newWrapper = wrapper.dive();

		const instance = newWrapper.instance();

		expect(newWrapper.state('showTutorEditModal')).to.equal(false);
		instance.showTutorModal();
		expect(newWrapper.state('showTutorEditModal')).to.equal(true);
		instance.hideTutorModal();
		expect(newWrapper.state('showTutorEditModal')).to.equal(false);
	});
});

//  Search Component Tests

describe('<SearchComponent />', () => {

    it('checks that showing info modal works', () => {
		const match = {
			params: {
				query: 'Math',
			},
		};

		const wrapper = shallow(<SearchComponent match={match} />);
		const newWrapper = wrapper.dive();

		const instance = newWrapper.instance();

		expect(newWrapper.state('showViewProfileModal')).to.equal(false);
		instance.showViewProfileModal();
		expect(newWrapper.state('showViewProfileModal')).to.equal(true);
	});

	it('checks that hiding info modal works', () => {
		const match = {
			params: {
				query: 'Math',
			},
		};

		const wrapper = shallow(<SearchComponent match={match} />);
		const newWrapper = wrapper.dive();

		const instance = newWrapper.instance();

		expect(newWrapper.state('showViewProfileModal')).to.equal(false);
		instance.showViewProfileModal();
		expect(newWrapper.state('showViewProfileModal')).to.equal(true);
		instance.hideViewProfileModal();
		expect(newWrapper.state('showViewProfileModal')).to.equal(false);
	});
});
