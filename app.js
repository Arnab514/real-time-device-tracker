const express = require('express');
const app = express();
const http = require('http');
const path = require('path');

const PORT = process.env.PORT || 3000;

const socketio = require('socket.io');
const server = http.createServer(app);

const io = socketio(server);

// Corrected the socket.io event name to "connection"
io.on("connection", function(socket){
    console.log("Connected");
});

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory using app.use
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.render('index');
});

// Added a callback to log when the server starts
server.listen(PORT, function() {
    console.log(`Server is running on http://localhost:${PORT}`);
});
