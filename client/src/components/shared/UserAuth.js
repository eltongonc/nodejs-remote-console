import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

function UserAuth({ children }) {
	const [user, setUser] = useState({});

	// check if token is valid


	if (localStorage.RC_TOKEN) {
		return children ;
	} 

	return <Redirect to='/login'/>;
}

export default UserAuth;