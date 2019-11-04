# Remote console
A remote debugger tool that allows you to view errors on all your frontend projects.

## Dependancies
- [Nodejs](https://nodejs.org/en/) - Backend
- [Express.js](https://expressjs.com/) - Web framework
- [React.js](https://reactjs.org/) - Frontend
- [Socket.io](https://socket.io/) - Connection between frontend and backend
- [Ant Design](https://ant.design/) - UI

## About
The idea behind the remote console is to allow anyone to monitor their project through this project.
Any error that happens on user's project will be caught and displayed on the dashboard at [No live link yet](#)

## Usage
A user can create an account and then create an HTML script element on their project that connects to use the endpoint `/js/client.js`

## Folder structure
```
+-- build/								Generated files and dirs copied from 'client/build'
+-- client/								The react frontend project.
|   +-- public/							Part of create react app (Will be removed)
|   +-- src/							All files need to ...
|	|   +-- assets/						All assets
|	|   +-- components/					All react components
|	|   +-- index.js					The root component required the build the react app
+-- public/								Allow access to all the assets
+-- server.js							The nodejs server handler
+-- sockets.js							All the websocket connection endpoints
```

## Todo
- [x] Expose a javascript that allows clients to connect to.
- [x] Create a javascript library that allows the user to easily emmit events.
- [x] Allow users send their errors through websocket.
- [x] Allow users to manually dispatch an event.
- [x] Allow the app to auto detect errors.
- [x] Implement React.js on the frontend.
- [ ] Prettify the incoming data and display it on the frontend
- [ ] Allow users to authenticate.
- [ ] Allow users to log different projects within their session.
- [ ] Generate an unique id for each project (window.origin).
- [ ] Utilize the [socket.io rooms feature](https://socket.io/docs/rooms-and-namespaces/#Rooms) to track different projects seperate.
- [ ] Add database to store previous messages.
- [ ] Merge the two packages.json files from the root and ./client/ dir
