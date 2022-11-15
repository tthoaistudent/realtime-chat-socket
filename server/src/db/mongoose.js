const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
    autoIndex: false,
}).then(()=>{
    console.log('Connect DB successfully!!');
});