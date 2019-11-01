const baseUrl = 'http://localhost:3000';

const clientEl = document.getElementById('remote-client');

const socketEl = document.createElement('script');
socketEl.src = baseUrl + '/socket.io/socket.io.js';

insertBefore(socketEl, clientEl);

/**
 * Inserts an html element before a specifi
 * @param {HTMLnode} el The html element you want to insert
 * @param {HTMLnode} referenceNode The html element you want to insert el before
 */
function insertBefore(el, referenceNode) {
    referenceNode.parentNode.insertBefore(el, referenceNode);
}


window.addEventListener('load', () => {
    // init the socket connection
    const rc = new RemoteConsole();

    rc.log('New Connection Init...');
    rc.error('New Error');

    setTimeout(()=> {
        asd
    }, 1000);
});


/**
 * 
 */
class RemoteConsole {
    constructor() {
        this.socket = window.io();

        window.addEventListener('error', (e) => {
            const error = {
                message: e.message,
                timeStamp: e.timeStamp,
                colnr: e.colno,
                filename: e.filename 
            };

            this.error(error);
        })
    }

    log(message) {
        this.socket.emit('log', JSON.stringify(message));
    }

    error(message) {
        this.socket.emit('error-log', JSON.stringify(message));
    }

}