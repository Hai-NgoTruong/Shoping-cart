const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require('passport');
const userSchema = new mongoose.Schema({
    email : {type : String, required : true},
    password : {type : String, required : true},
});

userSchema.methods.enCryptPassword = (password) => {
    return bcrypt.hashSync(password, 5);
}

userSchema.methods.validPassword = (password, encPassword) => {
    return bcrypt.compareSync(password, encPassword);
}
var User = mongoose.model('User', userSchema)

module.exports = User;