const express = require('express');
const router = express.Router();
var multer  = require('multer');
const { convertToObject } = require('typescript');
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Flights = require('../models/flights.model');
const Ticket = require('../models/ticket.model');
const UserDetails  = require('../models/userDetails.model');

const DIR = './public/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});

// Multer Mime Type Validation
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});

router.post('/add', upload.single('flightImage'), (req, res, next) => {
  const url = '../../../assets/img/airlines/'
  var imagePath = req.body.flightImage.slice(12, req.body.flightImage.length);
  console.log(req.body.departure)
  const flight = new Flights({
    flightName: req.body.flightName,
    from: req.body.from,
    destination: req.body.destination,
    departure: req.body.departure,
    timeDepart: req.body.timeDepart,
    timeArrival: req.body.timeArrival,
    seats: req.body.seats,
    fare: req.body.fare,
    flightImage: url + imagePath,
    time: req.body.time
  });
  flight.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: "airline registered successfully!",
    })
  }).catch(err => {
    console.log(err),
      res.status(500).json({
        error: err
      });
  })
})

router.post('/ticket',async (req, res) =>{
  const ticket = new Ticket({
    flightName: req.body.flightName,
    from: req.body.from,
    destination: req.body.destination,
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    timeDepart: req.body.timeDepart,
    departure: req.body.departure
  })
  const user = new UserDetails({
    name: req.body.name,
    email: req.body.email,
    password: "12345",
    mobile: req.body.mobile,
  })
  ticket.save().then(result => {
    console.log(result);
    res.send(ticket)
  }).catch(err => {
    console.log(err),
      res.status(500).json({
        error: err
      });
  })

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const payload = {
      user: {
          id: user.id
      }
  };

  jwt.sign(payload, "randomString", { expiresIn: 10000 }, (err, token) => {
      if (err) throw err;
      res.status(200).json({ token }).send(ticket);
  });
})

router.route('/update/:id').put(upload.single('flightImage'), (req, res, next) => {
  const url = '../../../assets/img/airlines/'
  var imagePath = req.body.flightImage.slice(12, req.body.flightImage.length);

  const update = {
    flightName: req.body.flightName,
    from: req.body.from,
    destination: req.body.destination,
    departure: req.body.departure,
    timeDepart: req.body.timeDepart,
    timeArrival: req.body.timeArrival,
    seats: req.body.seats,
    fare: req.body.fare,
    flightImage: url + imagePath,
    time: req.body.time
  };
  Flights.findByIdAndUpdate(req.params.id, {
    $set: update
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

router.post("/search", async (req, res) => {

    flight = {
        from: req.body.from,
        destination: req.body.destination
    }
    console.log(flight, "in /search")
    try {
      let flightDetails = await Flights.find(flight);
      if (!flightDetails)
        return res.status(400).json({
          message: "User Not Exist"
        });

      res.send(flightDetails);
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
  }
});

router.route('/delete/:id').delete((req, res, next) => {
  Flights.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = router;