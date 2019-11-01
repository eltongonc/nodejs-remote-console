# Remote console
A remote debugger tool to use for all frontend projects

## Dependancies
- Socket.io
- Nodejs

## Usage
A frontend project can use this tool as a debug tool. The project needs to create a new websocket connection to remote-console.eltongoncalves.nl.

## Todo
- [x] Expose a javascript that allows clients to connect to.
- [ ] Create a javascript library that allows the user to easily emmit events.
- [x] Allow users send their errors through websocket.
- [x] Allow users to manually dispatch an event.
- [ ] Allow the app to auto detect errors.
- [ ] Prettify the incoming data and display it on the frontend
- [ ] Allow users
- [ ] Add rooms to track different projects seperate.
