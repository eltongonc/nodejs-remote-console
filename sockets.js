module.exports = function sockets(app, server){
    socketIO = require('socket.io') // websockets
    io = socketIO.listen(server);

    // socket events
    io.on('connection', function(client){
        console.log('new connection', client.id);
        client.emit('new-connection');

        client.on('log', (message) => {
            // create ui to parse the message on the ui
            console.log(JSON.parse(message));
            client.broadcast.emit('display-log', message);
        });

        client.on('error-log', (message) => {
            // create ui to parse the message on the ui
            console.log(JSON.parse(message));
            client.broadcast.emit('display-error', message);
        });

        // Whenever a user shuts down the browser
        client.on('disconnect', function(){
            console.log('session terminated');
        });
    });
}