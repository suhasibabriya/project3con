var mongoose = require("mongoose");

var contactSchema = new mongoose.Schema({
    name: {
        type: String,
        unique :true,
        require:true
    },
    contact_no: {
        type: Number,
        unique :true,
        require : true
    },
    user_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        require:true
    }
})

module.exports = mongoose.model('contact',contactSchema);