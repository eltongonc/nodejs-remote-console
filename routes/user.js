const router = require('express').Router();
const auth = require('../lib/jwt');

const projects = [{
	"id": 1,
	"project": "Veribet",
	"issues": 10
  }, {
	"id": 2,
	"project": "Matsoft",
	"issues": 7
}];

const issues = [{
	"id": 1,
	"project_id": 1,
	"date": new Date(),
	"type": 'log',
	"name": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus."
  }, {
	"id": 2,
	"project_id": 1,
	"date": new Date(),
	"type": 'error',
	"name": "Sed sagittis."
  }, {
	"id": 3,
	"project_id": 2,
	"date": new Date(),
	"type": 'log',
	"name": "Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis."
  }, {
	"id": 4,
	"project_id": 2,
	"date": new Date(),
	"type": 'error',
	"name": "Vivamus vestibulum sagittis sapien."
}]

router.get('/', (req, res) => {
	if (req.user) {
	  res.send({user: req.user});
	} else {
	  res.send({user: null});
	}
});


// send all your projects
router.get('/projects', auth.required, (req, res) => {
	res.send(projects);
});

// send a specific project
router.get('/projects/:id', auth.required, (req, res) => {
	const { id } = req.params;
	const project = projects.filter(p => p.id === Number(id))[0];
	
	res.send(project);
});

// send all your issues
router.get('/issues/', auth.required, (req, res) => {
	res.send(issues);
});

// send a specific issue
router.get('/issues/:id', auth.required, (req, res) => {
	const { id } = req.params;
	const issue = issues.filter(p => p.id === Number(id))[0];

	res.send(issue);
});




module.exports = router;