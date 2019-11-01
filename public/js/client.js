const clientEl = document.getElementById('remote-client');

// should add path to socket.io script to the bottom of the page
const socketEl = document.createElement('script');
socketEl.src = '/socket.io/socket.io.js';

const newEl = socketEl;
const ref = clientEl;

insertBefore(newEl, ref);

function insertBefore(el, referenceNode) {
    referenceNode.parentNode.insertBefore(el, referenceNode);
}



window.addEventListener('load', () => {
    // init the socket connection
    const rc = new RemoteConsole();

    rc.log('slknlsndlaknsldka');
})

function RemoteConsole() {
    const socket = window.io();

    this.log = function log(message) {
        socket.emit('log', JSON.stringify(message));
    }

}