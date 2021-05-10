const mongoose = require('mongoose');

const UserDetailsSchema = new mongoose.Schema({
    name:{
        type: String,
        minlength: 5,
        required: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    mobile: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 10
    }
}, { collection: 'userDetails' });

const UserDetails = mongoose.model('UserDetails', UserDetailsSchema);

module.exports = UserDetails;