const http = require('http')
const express = require('express')
const { Server } = require('socket.io')
const path = require('path')

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', (socket) => {
    console.log('User connected:', socket.id)
})

io.on("connection", (socket) => {
    socket.on("user-message", (message) => {
        // console.log('a new message:', message)
        io.emit('message', message)
    })
})

server.listen(8080, () => {
    console.log('Listening on port 8080')
})