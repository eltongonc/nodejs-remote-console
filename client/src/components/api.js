import axios from 'axios';

const baseUrl = 'http://localhost:3000';

const api = {
	registerUser(payload, callback) {
		axios({
			method: 'POST',
			url: baseUrl + '/register',
			data: payload,
		}).then((res) => {
			if (callback) {
				callback(null, res.data);
			}
		}).catch((err) => { callback(err.response); });
	},

	verifyUser(payload, callback) {
		axios({
			method: 'POST',
			url: baseUrl + '/login/user',
			data: payload,
		}).then((res) => {
			localStorage.RC_TOKEN = res.data.user.token;

			if (callback) {
				callback(null, res.data);
			}
		}).catch((err) => { callback(err.response); });
	},

	logOut(callback) {
		localStorage.removeItem('RC_TOKEN');
		setTimeout(() => {
			callback();
		}, 100);
	},

	getIssues(callback) {
		axios({
			method: 'GET',
			url: baseUrl + '/user/issues/',
			headers: {
				'Authorization': 'Token ' + localStorage.RC_TOKEN,
			}
		}).then((res) => {
			
			if (callback) {
				callback(null, res.data);
			}
		}).catch((err) => { callback(err.response); });
	},

	getProjects(callback) {
		axios({
			method: 'GET',
			url: baseUrl + '/user/projects/',
			headers: {
				'Authorization': 'Token ' + localStorage.RC_TOKEN,
			}
		}).then((res) => {
			if (callback) {
				callback(null, res.data);
			}
		}).catch((err) => { callback(err.response); });
	}
};


export default api;
