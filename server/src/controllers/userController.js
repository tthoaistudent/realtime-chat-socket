const User = require('../models/userModel');

exports.setAvatar = async (req, res) => {
    try{
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(
            userId,
            {
                isAvatarImage: true,
                avatar: avatarImage
            },
            {new: true}
        );

        res.status(200).send(userData);
    }catch(e){
        res.status(500).send(e.message);
    }
}

exports.getAllUser = async (req, res) => {
    try{
        const user = await User.find({_id: {$ne: req.params.id}}).select([
            "email",
            "username",
            "avatar",
            "_id"
        ]);
        res.status(200).send(user);
    }catch(e){
        res.status(500).send(e.message);
    }
}