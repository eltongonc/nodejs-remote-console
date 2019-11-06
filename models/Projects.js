const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProjectsSchema = new Schema({
	owner: String,
	created_at: Date,
	name: String,
	url: String,
});

const Project = mongoose.model('project', ProjectsSchema);

module.exports = Project;