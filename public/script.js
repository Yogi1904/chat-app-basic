const socket = io();
console.log('client connected')

const sendBtn = document.getElementById('sendBtn')
const messageInput = document.getElementById('message')
const allMessages = document.getElementById('messages')


socket.on('message', (message) => {
    const p = document.createElement('p')
    p.innerText = message
    allMessages.appendChild(p)
})

sendBtn.addEventListener('click', (e) => {
    const message = messageInput.value
    if(message) {
        // console.log('sent by you!')
        socket.emit('user-message', message)
    }
})