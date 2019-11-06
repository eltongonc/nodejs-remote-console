require('dotenv').config()

const express = require('express');
const path = require('path');
const http = require('http');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

const passport = require('./lib/passport');
const auth = require('./lib/jwt');
const User = require('./models/Users');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';
app.set('port', port);


/**
 * Config
 */

// init database
mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('debug', true);

// init sockets
require('./lib/sockets')(server);

// Cross browser support
app.use(cors());

// parse form
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static dirs
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'build')));

// Cookies
// app.use(cookieParser());
app.use(session({
  cookie: {maxAge: 6000},
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_KEY,
}));


/**
 * Initialize passport
 */
// app.use(passport.initialize());
// app.use(passport.session());


/**
 * Routes
 */
app.use('/login', require('./routes/login'));
app.use('/user', require('./routes/user'));
app.get('/logout', (req,res) => {
  req.logOut();
  res.redirect('/');
});
app.get('/forgot-password', (req, res) => {
  res.send('<h4>Too bad <h4/><p>try admin - admin</p>');
});
app.post('/register', auth.optional, (req, res) => {
  const { user } = req.body;

	if(!user.email) {
		return res.status(422).json({
		  errors: {
			message: 'Email is required',
		  },
		});
	}
	
	if(!user.password) {
		return res.status(422).json({
			errors: {
				message: 'Password is required',
			},
		});
  }
  
  User.findOne({email : user.email}).then((currentUser) => {
    if (currentUser) {
      res.status(422).json({
        errors: {
          message: 'User already exists',
        },
      });
    } else {
      const newUser = new User({
        email: user.email,
      })

      newUser.setPassword(user.password)
      
      newUser.save().then(() => {
        res.status(200).json({
          message: 'User created',
          user: newUser.toAuthJSON(),
        });
      }).catch(err => { throw err });
    }
  }).catch(err => { throw err });
});



/**
 * Client connection url
 * Can also be accesed through /js/client.js
 */
app.get('/client.js', (req, res) => {
    const clientPath = path.resolve(__dirname, 'public/js');
    
    fs.exists(clientPath, (exists) => {
      // if the file is not found, return 404
      if(!exists) {
        res.statusCode = 404;
        res.end(`File ${clientPath} not found!`);
        return;
      }
  
      // read file from file system
      fs.readFile(clientPath + '/client.js', function(err, data){
        if(err){
          res.statusCode = 500;
          res.end(`Error getting the file: ${err}.`);
        } else {
          res.end(data);
        }
      });
    })
});


// Ensure we allow the react app to handle the routing
app.use('*', express.static(path.join(__dirname, 'build')));


/**
 * catch 404 and forward to error handler
 * if react-router handles the routing is this needed?
 */
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});


/**
 * Not sure if i should catch the errors in the UI depending on the env
 */

// development error handler
if (app.get('env') === 'development') {
    app.use((err, req, res) => {
        res.status(err.status || 500);
        // redirect to a page on the UI that catches the error and logs it
        res.json({
          errors: {
            message: err.message,
            error: err,
          },
        });
    });
}

// production error handler
app.use((err, req, res) => {
    res.status(err.status || 500);
    // redirect to a page on the UI that catches the error and logs it
    res.redirect('/500')
});


// Start app
server.listen(app.get('port'), function() {
    console.log('Express server listening on port http://localhost:' + port);
});


module.exports = app;
