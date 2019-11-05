import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

function UserAuth({ children }) {
	const [user, setUser] = useState({});

	useEffect(() => {
		axios({
			method: 'GET',
			url: '/user'
		}).then(res => {
			const { id } = res.data.user;
			// probably not sent the entire user object
			setUser({id});
			localStorage.userToken = id;
		}).catch(err => {
			setUser(null);
		});
	}, []);

	if (user) {
		return children ;
	} 

	return <Redirect to='/login'/>;
}

export default UserAuth;