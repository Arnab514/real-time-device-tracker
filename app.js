const express = require('express');
const app = express();
const http = require('http');
const path = require('path');

const PORT = process.env.PORT || 3000;

const socketio = require('socket.io');
const server = http.createServer(app);

const io = socketio(server);

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("send-location", (data) => {
        console.log(`Location received from ${socket.id}: ${data.latitude}, ${data.longitude}`);
        io.emit("receive-location", { id: socket.id, ...data });
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
        io.emit("user-disconnected", socket.id);
    });
});

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory using app.use
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

// Added a callback to log when the server starts
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
