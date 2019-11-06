import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

function UserAuth({ children }) {
	const [user, setUser] = useState({});

	// check if token is valid


	if (localStorage.RC_TOKEN) {
		return children ;
	} 

	return <Redirect to='/login'/>;
}

export default UserAuth;