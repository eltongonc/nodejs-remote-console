import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import UserAuth from './UserAuth';
import Login from '../pages/Login.js';
import Dashboard from '../pages/Dashboard.js';
import Register from '../pages/Register';


function Router() {
	return (
		<Switch>
			<Route path="/login" component={Login} exact/>
			<Route path="/register" component={Register} exact/>

			<UserAuth>
				<Route path="/" component={Dashboard}/>
			</UserAuth>
			
		</Switch>
	);
}

Router.propTypes = {
	location: PropTypes.object
};

export default Router;