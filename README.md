# Remote console
A remote debugger tool that allows you to view errors on all your frontend projects.

## Dependancies
- Socket.io
- Nodejs
- React.js


## Usage
A frontend project can use this tool as a debug tool. The project needs to create a new websocket connection to remote-console.eltongoncalves.nl.

## Todo
- [x] Expose a javascript that allows clients to connect to.
- [ ] Create a javascript library that allows the user to easily emmit events.
- [x] Allow users send their errors through websocket.
- [x] Allow users to manually dispatch an event.
- [ ] Allow the app to auto detect errors.
- [ ] Prettify the incoming data and display it on the frontend
- [ ] Allow users to log in.
- [ ] Allow users to log different projects within their login.
- [ ] Add rooms to track different projects seperate.
- [ ] Implement React.js on the frontend.
- [ ] Add database to store previous messages.
- [ ] Generate an unique id for each project (window.origin).