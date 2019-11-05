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
	} 
};


export default api;
