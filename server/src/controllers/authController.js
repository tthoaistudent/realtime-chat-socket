const bcrypt = require('bcrypt');

const User = require('../models/userModel')

exports.register = async (req, res) => {
    try{
        const checkUser = await User.findOne({username: req.body.username});
        if(checkUser){
            res.status(409).send('Username already exists!!')
            return;
        }

        const checkEmail = await User.findOne({email: req.body.email});
        if(checkEmail){
            res.status(409).send('Email already exists!!')
            return;
        }

        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).send(newUser);
    }catch(e){
        res.status(500).send(e.message)
    }
}

exports.login = async (req, res) => {
    try{
        const user = await User.findOne({username: req.body.username});
        if(!user){
            res.status(404).send('User not found!!');
            return;
        }

        const isComparePassoword = await bcrypt.compare(req.body.password, user.password);
        if(!isComparePassoword){
            res.status(401).send('Username or Password incorrect !!');
            return;
        }

        res.status(200).send(user);
    }catch(e){
        res.status(500).send(e.message);
    }
}