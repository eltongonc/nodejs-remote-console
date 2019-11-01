const canvas = document.createElement('textarea');

window.addEventListener('load', () => {
	const io = window.io();

	insertBefore(canvas, document.getElementById('remote-dashboard'));

	io.on('new-connection', () => {
		displayMessage('Connected...');
	});


	io.on('display-log', (message) => {
		console.log(message);
		displayMessage(message);
	});

	// Color it red
	io.on('display-error', (message) => {
		console.log(message);
		
		displayMessage(message);
	});

});

function displayMessage(string) {
	const message = string + '\n';
	canvas.innerHTML += message 
}

