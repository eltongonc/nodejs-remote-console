const router = require('express').Router();

const auth = require('../lib/jwt');
const Issue = require('../models/Issues');
const Project = require('../models/Projects');

router.get('/', (req, res) => {
	if (req.user) {
	  res.send({user: req.user});
	} else {
	  res.send({user: null});
	}
});


// send all your projects
router.post('/project', auth.required, (req, res) => {
	const { project } = req.body;

	if(!project.name) {
		return res.status(422).json({
			errors: {
				message: 'The project needs a name',
			},
		});
	}
	if(!project.url) {
		return res.status(422).json({
			errors: {
				message: 'The project needs a URL',
			},
		});
	}

	new Project({
		name: project.name,
		url: project.url,
		owner: req.payload.email,
		created_at: new Date,
	}).save().then((newIssue) => {
        res.status(200).json({
          message: 'Project created',
          data: newIssue,
        });
      }).catch(err => {
		res.status(422).json({
			errors: {
				message: 'Something went wrong while creating the project',
			},
		});
	});
});

router.get('/projects', auth.required, (req, res) => {
	Project.find({owner: req.payload.email}).then((projects) => {
		res.send(projects);
	})
});

// send a specific project
router.get('/projects/:id', auth.required, (req, res) => {
	const { id } = req.params;
	Issue.findOne({_id: id}).then((project) => {
		res.send(project);
	}).catch((err) => {
		res.status(422).json({
			errors: {
				message: 'No project was found',
			},
		});
	});
});

// new issue
router.post('/issue/', auth.required, (req, res) => {
	const { issue } = req.body;

	if(!issue.project_id) {
		return res.status(422).json({
			errors: {
				message: 'The issues needs to a have project id',
			},
		});
	}

	if(!issue.type) {
		return res.status(422).json({
			errors: {
				message: 'The issues needs to have a "log" or "error" type',
			},
		});
	}

	if(!issue.name) {
		return res.status(422).json({
			errors: {
				message: 'The issues needs to have a name',
			},
		});
	}

	new Issue({
		project_id: issue.project_id,
		owner: req.payload.email,
		type: issue.type,
		name: issue.name,
		date: new Date,
	}).save().then((newIssue) => {
        res.status(200).json({
          message: 'Issue created',
          data: newIssue,
        });
      }).catch(err => {
		res.status(422).json({
			errors: {
				message: 'Something went wrong while creating the issue',
			},
		});
	  });
});

// send all your issues
router.get('/issues/', auth.required, (req, res) => {
	Issue.find({owner: req.payload.email}).then((issues) => {
		res.send(issues);
	});
});

// send a specific issue
router.get('/issues/:id', auth.required, (req, res) => {
	const { id } = req.params;

	Issue.findOne({_id: id}).then((issue) => {
		res.send(issue);
	}).catch((err) => {
		res.status(422).json({
			errors: {
				message: 'No issue was found',
			},
		});
	});
});




module.exports = router;