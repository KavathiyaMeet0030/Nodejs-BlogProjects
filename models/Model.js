const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    fname : {
        type: String,
        required: true
    },
    lname : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    }
})  


const msg = mongoose.model('users', messageSchema);

module.exports = msg;                                                                                                                                                                               

