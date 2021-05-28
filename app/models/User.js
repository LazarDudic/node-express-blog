const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : { type : String , required : true},
    lastName : { type : String , required : true},
    email : { type : String , uniqe : true , required : true},
    password : { type : String , required : true },
    rememberToken : { type : String , default : null}
},
    {timestamps : true }
);

const User = mongoose.model('user', userSchema);

module.exports = User;