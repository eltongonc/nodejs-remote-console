const express = require('express');
const path = require('path');
const http = require('http');
const fs = require('fs');
const cookieParser = require('cookie-parser')

const passport = require('./passport');

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

// init sockets
require('./sockets')(server);

app.set('port', port);

app.user(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'build')));

// Ensure we allow the react app to handle the routing
app.use('*', express.static(path.join(__dirname, 'build')));

app.get('/login/:strategy', (req, res) => {
  p
});

// passport google callback url
app.get('/login/auth/callback', 
    passport.authenticate( 'google', { 
      successRedirect: '/login/success',
      failureRedirect: '/login/failure',
    })
);

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
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        // redirect to a page on the UI that catches the error and logs it
        res.redirect('/500')
    });
}

// production error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    // redirect to a page on the UI that catches the error and logs it
    res.redirect('/500')
});


// Start app
server.listen(app.get('port'), function() {
    console.log('Express server listening on port http://localhost:' + port);
});


module.exports = app;
