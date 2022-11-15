const express = require('express');
const cors = require('cors');
const Router = require('./src/routes/index');
const socket = require('socket.io');


const app = express();
require('dotenv').config();

// Connect db
require('./src/db/mongoose');

app.use(cors());
app.use(express.json());

// get all router
Router(app);


const server = app.listen(process.env.PORT, () => {
    console.log(`Server starting on port ${process.env.PORT}`)
})

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
})

global.ononline = new Map(); 
io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on('add-user', (userId) => {
        ononline.set(userId, socket.id)
    });
    socket.on('send-msg', (data) => {
        const sendUserSocker = ononline.get(data.to);
        if(sendUserSocker){
            socket.to(sendUserSocker).emit('msg-recieve', data.message)
        }
    })
})

io.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
});