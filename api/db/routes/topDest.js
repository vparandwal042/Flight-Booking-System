const express = require('express');
const router = express.Router();
var multer  = require('multer');

const TopDest = require('../models/topDest.model');

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

router.post('/add', upload.single('cityImage'), (req, res, next) => {
  const url = '../../../assets/img/cities/'
  var imagePath = req.body.cityImage.slice(12, req.body.cityImage.length);
  const airline = new TopDest({
    from: req.body.from,
    destination: req.body.destination,
    fare: req.body.fare,
    cityImage: url + imagePath,
  });
  airline.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: "airline registered successfully!",
      airlineCreated: {
        _id: result._id,
        name: result.name,
        avatar: result.avatar
      }
    })
  }).catch(err => {
    console.log(err),
      res.status(500).json({
        error: err
      });
  })
})

router.route('/update/:id').put(upload.single('cityImage'), (req, res, next) => {
  const url = '../../../assets/img/cities/'
  var imagePath = req.body.cityImage.slice(12, req.body.cityImage.length);
  const update = {
    from: req.body.from,
    destination: req.body.destination,
    cityImage: url + imagePath,
    fare: req.body.fare
  }
  TopDest.findByIdAndUpdate(req.params.id, {
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

router.route('/delete/:id').delete((req, res, next) => {
    TopDest.findByIdAndRemove(req.params.id, (error, data) => {
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