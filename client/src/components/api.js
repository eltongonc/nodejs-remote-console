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
};


export default api;
