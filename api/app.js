const express = require('express');
const app = express();
const users = require('./db/routes/users');
const flights = require('./db/routes/flight');
const airlines = require('./db/routes/airline');
const topDest = require('./db/routes/topDest');
const admin = require('./db/routes/admin');

const { flightMongoose } = require('./db/flight-mongoose')

const bodyParser = require('body-parser');

const Flights  = require('./db/models/flights.model');
const Airlines  = require('./db/models/airlines.models');
const TopDest  = require('./db/models/topDest.model');
const UserDetails = require('./db/models/userDetails.model');

app.use((req, res, next) =>{

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,DELETE,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//For Flights and Search Flights
app.get('/flights', (req, res) =>{
    Flights.find({}).then((flights) =>{
        res.send(flights);
    });
});
app.get('/flight/:id', (req, res) =>{
    Flights.findById(req.params.id, (err, data) =>{
        if (err){
            console.log(err);
        }
        else{
            res.send(data);
        }
    })
})
app.get('/flights/edit/:id', (req, res) =>{
    Flights.findById(req.params.id, (err, data) =>{
        if (err){
            console.log(err);
        }
        else{
            res.send(data);
        }
    })
})
app.use('/flights', flights);

//For Airlines
app.get('/airlines', (req, res) =>{
    Airlines.find({}).then((airlines) =>{
        res.send(airlines);
    }).catch((err) =>{
        console.log(err);
    })
})
app.get('/airline/edit/:id', (req, res) =>{
    Airlines.findById(req.params.id, (err, data) =>{
        if (err){
            console.log(err);
        }
        else{
            res.send(data);
        }
    })
})
app.use('/airline', airlines);

//For Users
app.get('/users', (req, res) =>{
    UserDetails.find({}).then((users) =>{
        res.send(users);
    }).catch((err) =>{
        console.log(err);
    })
})
app.get('/users/edit/:id', (req, res) =>{
    UserDetails.findById(req.params.id, (err, data) =>{
        if (err){
            console.log(err);
        }
        else{
            res.send(data);
        }
    })
})
//Sign Up, Login, Update, Delete
app.use('/users', users);


//Top Destination
app.get('/top-dest', (req, res) =>{
    TopDest.find({}).then((topDest) =>{
        res.send(topDest)
    }).catch((err) =>{
        console.log(err)
    })
})
app.get('/topDest/edit/:id', (req, res) =>{
    TopDest.findById(req.params.id, (err, data) =>{
        if (err){
            console.log(err);
        }
        else{
            res.send(data);
        }
    })
})
app.use('/topDest', topDest);

app.use('/admin', admin)

app.listen(3000, () =>{
    console.log("Listening Port 3000");
});