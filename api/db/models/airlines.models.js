const mongoose = require('mongoose');

const AirlinesSchema = new mongoose.Schema({
    airlineName:{
        type: String,
        required: true
    },
    airlineImage:{
        type: String,
        required: true
    }
}, { collection: 'airlines' });

const Airlines = mongoose.model('Airlines', AirlinesSchema);

module.exports =  Airlines;