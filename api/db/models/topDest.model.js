const mongoose = require('mongoose');

const TopDestSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    fare: {
        type: String,
        required: true
    },
    cityImage: {
        type: String,
        required: true
    }
}, { collection: 'topDest' });

const TopDest = mongoose.model('TopDest', TopDestSchema);

module.exports = TopDest;