const axios = require('axios');

const baseUrl = 'https://nodejs-remote-console.herokuapp.com';

const fakeAuth = {
	isAuthenticated: localStorage.userToken,
	authenticate(callback) {
		axios.get(baseUrl + '/user').then((res)=> {
			console.log(res);
			if (res) {
				localStorage.userToken = res.id;
			}
			callback();
		});
	},
	
	signout(callback) {
		this.isAuthenticated = false;

		localStorage.removeItem('userToken');

		axios.get(baseUrl + '/logout');

		callback();

	}
};

export default fakeAuth;