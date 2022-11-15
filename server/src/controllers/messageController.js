const Message = require("../models/messageModel");

exports.addMessage = async (req, res) => {
    try{
        const { from, to, message } = req.body;
        const data = await Message.create({
            message: { text: message},
            users: [from, to],
            sender: from
        })

        if(!data){
            res.status(500).send("Faild to add message!!");
            return
        }

        res.status(200).send("Message added!!");
    }catch(e){
        res.status(500).send("Faild to add message!!");
    }
}

exports.getAllMessage = async (req, res) => {
    try{
        const { from, to } = req.body;
        const messages = await Message.find({
            users: {
                $all: [from, to]
            }
        }).sort({updateAt: 1});

        const projectMessage = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text
            }
        })

        res.status(200).send(projectMessage);
    }catch(e){

    }
}