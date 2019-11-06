const baseUrl = 'https://nodejs-remote-console.herokuapp.com';

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


class RemoteConsole {
    constructor() {
        this.socket = window.io(baseUrl);

        window.addEventListener('error', (e) => {
            const error = e.message;

            this.error(error);
        })
    }

    log(message) {
        this.socket.emit('log', message);
    }

    error(message) {
        this.socket.emit('error-log', message);
    }

}