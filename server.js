const http = require('http')
const express = require('express')
const { Server } = require('socket.io')
const path = require('path')

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.static(path.join(__dirname, 'public')))

//making bootstrap available for use
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')))

io.on('connection', (socket) => {
    console.log('User connected.', socket.id)

    socket.on("user-joined", (username) => {
        socket.username = username
        io.emit('joined', username)
    })

    socket.on("user-message", ({username, message, time}) => {
        io.emit('message', {username, message, time})
    })

    socket.on("disconnect", () => {
        io.emit('disconnected', socket.username)
    })
})


server.listen(8080, () => {
    console.log('Listening on port 8080')
})