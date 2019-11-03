const baseUrl = 'http://localhost:3000';

const clientEl = document.getElementById('remote-client');

const socketEl = document.createElement('script');
socketEl.src = baseUrl + '/socket.io/socket.io.js';

insertBefore(socketEl, clientEl);

/**
 * Inserts an html element before a specific element
 * @param {HTMLnode} el The html element you want to insert
 * @param {HTMLnode} referenceNode The html element you want to insert el before
 */
function insertBefore(el, referenceNode) {
    referenceNode.parentNode.insertBefore(el, referenceNode);
}


/**
 * This bit of code is to test if the RemoteConsole class works
 */
window.addEventListener('load', () => {
    // init the socket connection
    const rc = new RemoteConsole();

    // Test log
    rc.log('New Connection Init...');

    // Test error manually
    rc.error('New Error');

    // Test error
    setTimeout(()=> {
        asd
    }, 1000);
});


class RemoteConsole {
    constructor() {
        this.socket = window.io(baseUrl);

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