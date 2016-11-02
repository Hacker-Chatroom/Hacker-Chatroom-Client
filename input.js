'use strict'

const readline = require('readline')
const Input = (() => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    let username = 'anon' 

    function setName(socket) {
        rl.question('Enter username: ', (uname) => {
            username = uname.replace(/\s/g, '')
            rl.close
            sendMessage(socket)
        })
    }

    function setRoom(socket) {
        rl.question("What room to join?", (room) => {
            socket.emit('create', room)
        })
        rl.close
    }

    function sendMessage(socket) {
        // TODO: Find a method to keep > at bottom
        rl.question('>', (answer) => {
            if(answer === ':q'){
                rl.close
                process.exit()
            }
            socket.emit('general', {
                name: username,
                date: new Date(),
                message: answer
            })
            rl.close
            sendMessage(socket)
        })
    }

    return {
        sendMessage,
        setRoom,
        setName
    }
})()

module.exports = Input