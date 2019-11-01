const express = require('express');
const path = require('path');
const http = require('http');
const fs = require('fs');

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

// init sockets
require('./sockets')(app, server);

app.set('port', port);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'build')));

app.use('/', express.static(path.join(__dirname, 'build')));

/**
 * Client connection url
 */
app.get('/client.js', (req, res) => {
    const clientPath = path.resolve(__dirname, 'public/js');
    console.log(clientPath);
    
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

/// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});


// Start app
server.listen(app.get('port'), function() {
    console.log('Express server listening on port http://localhost:' + port);
});


module.exports = app;
