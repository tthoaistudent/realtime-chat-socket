const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true
    },
    isAvatarImage: {
        type: Boolean,
        default: false
    },
    avatar: {
        type:String,
        default: ''
    }
})

userSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    return userObject;
}


userSchema.pre('save',async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next();
});


const userModel = mongoose.model('User', userSchema);

module.exports = userModel;