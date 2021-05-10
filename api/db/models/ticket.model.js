const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    flightName: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    name:{
        type: String,
        minlength: 5,
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    timeDepart: {
        type: String,
        required: true
    },
}, { collection: 'ticket' });

const Ticket = mongoose.model('ticket', TicketSchema);

module.exports = Ticket;