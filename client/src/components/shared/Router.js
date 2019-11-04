import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Login from '../pages/Login.js';
import Dashboard from '../pages/Dashboard.js';
import fakeAuth from './fakeAuth.js';
// import ForgotPassword from '../pages/ForgotPassword.js';
// import PageNotFound from '../pages/PageNotFound';
// import MyAccount from '../pages/MyAccount.js';

const PrivateRoute = ({ component: Component, ...rest}) => (
	<Route {...rest} render={(props) => (
		fakeAuth.isAuthenticated === true
			? <Component {...props} />
			: <Redirect to='/login' />
	)} />
);

function Router() {
	return (
		<Switch>
			
			{/** Login page */}
			<Route path="/login" component={Login} exact/>
			
			<PrivateRoute path="/" component={Dashboard}/>
			
			{/** 404 page 
				<Route path='/page_not_found' component={PageNotFound} />
				<Redirect from='/*' to='/page_not_found' />
			*/}
		</Switch>
	);
}

Router.propTypes = {
	location: PropTypes.object
};

export default Router;