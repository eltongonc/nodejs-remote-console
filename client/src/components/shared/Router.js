import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Login from '../pages/Login.js';
import Dashboard from '../pages/Dashboard.js';
// import ForgotPassword from '../pages/ForgotPassword.js';
// import PageNotFound from '../pages/PageNotFound';
// import MyAccount from '../pages/MyAccount.js';

function Router() {
	const authUser = () => {
		const auth = false;

		if (auth) {
			return <Route path="/" component={Dashboard} exact/>;
		}
		
		return <Redirect to="login"/>;
	};


	return (
		<Switch>
			{/** Login page */}
			<Route path="/login" component={Login} exact/>

			{/** settings page 
				<Route path="/settings" component={Login} exact/>
			*/}
			
			{authUser()}

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