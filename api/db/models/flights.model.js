const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
    flightName:{
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    departure: {
        type: String,
        required: true
    },
    timeDepart: {
        type: String,
        required: true
    },
    timeArrival: {
        type: String,
        required: true
    },
    seats: {
        type: String,
        required: true
    },
    fare: {
        type: String,
        required: true
    },
    flightImage:{
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
}, { collection: 'flights' });

const Flights = mongoose.model('Flights', FlightSchema);

module.exports = Flights;