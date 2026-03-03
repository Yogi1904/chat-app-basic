const sendBtn = document.getElementById('sendBtn')
const messageInput = document.getElementById('message')
const allMessages = document.getElementById('messages')

// const username = "yogi"
const username = prompt('Enter your username: ')

const socket = io();
console.log('client connected')
socket.emit('user-joined', username)


socket.on('message', ({username, message, time}) => {
    const p = document.createElement('p')
    p.innerText = `(${time}) ${username}: ${message}`
    p.classList.add("mb-2")
    allMessages.appendChild(p)
    allMessages.scrollTop = allMessages.scrollHeight
})

socket.on('joined', (username) => {
    const p = document.createElement('p')
    p.innerText = username + " has joined the session!"
    p.classList.add("text-secondary",  "small")
    allMessages.appendChild(p)
    allMessages.scrollTop = allMessages.scrollHeight
})

socket.on('disconnected', (username) => {
    const p = document.createElement('p')
    p.innerText = username + " left the session!"
    p.classList.add("text-secondary",  "small")
    allMessages.appendChild(p)
    allMessages.scrollTop = allMessages.scrollHeight
})

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendBtn.click()
    }
})

sendBtn.addEventListener('click', (e) => {
    const message = messageInput.value
    const time = timeExtractor()
    if(message) {
        // console.log('sent by you!')
        socket.emit('user-message', {username: username, message: message, time: time})
        messageInput.value = ""
    }
})

function timeExtractor(){
    const now = new Date()
    return now.toTimeString().slice(0, 5)
}