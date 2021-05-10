const flightMongoose = require('mongoose');

flightMongoose.Promise = global.Promise;
const dbURL = 'mongodb+srv://vishal:Dhvs1234@cluster0.fuena.mongodb.net/FlightSystem?retryWrites=true&w=majority';

flightMongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true}).then(() =>{
    console.log("Connected to Flight Mongodb");
}).catch((e) =>{
    console.log("Error While Connecting to Mongodb: ", e);
});

flightMongoose.set('useCreateIndex', true);
module.exports = {
    flightMongoose
};