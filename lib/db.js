const mongoose = require('mongoose');

const { Schema } = mongoose;

mongoose.connect(process.env.MONGO_DB, (err) => {
	if (err) throw err;

	console.log('connected to database');
});

const userSchema = new Schema({
	username: String,
	googleId: String,
});

const User = mongoose.model('user', userSchema);


module.exports = { mongoose, User };