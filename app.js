const express = require('express')
const app = express()
const http = require('http')
const path = require('path')

const PORT = process.env.PORT || 3000

const socketio = require('socket.io')
const server = http.createServer(app)

const io = socketio(server)

app.set('view engine' , 'ejs')
app.set(express.static(path.join(__dirname , 'public')))

app.get('/', function(req, res){
    res.send('hello')
})

server.listen(PORT)