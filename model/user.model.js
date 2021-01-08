const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email : {type : String, required : true},
    password : {type : String, required : true},
});

var Product = mongoose.model('User', userSchema)


module.exports = userSchema;       