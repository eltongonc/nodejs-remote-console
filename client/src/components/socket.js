import socketIOClient from 'socket.io-client';

const socket = socketIOClient('https://nodejs-remote-console.herokuapp.com');

export default socket;