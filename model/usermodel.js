var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        require : true
    },
    email: {
        type: String,
        unique : true,
        require : true
    },
    password: {
        type: String,
        unique : true,
        require: true
    }
})

module.exports = mongoose.model('user', userSchema);