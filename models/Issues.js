const mongoose = require('mongoose');

const { Schema } = mongoose;

const IssuesSchema = new Schema({
	project_id: Number,
	owner: String,
	date: Date,
	type: String,
	name: String, 
});

const Issue = mongoose.model('issue', IssuesSchema);

module.exports = Issue;