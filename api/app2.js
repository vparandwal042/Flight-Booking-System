const mongoose = require('mongoose');
const express = require('express');
const db = require("./db/model");
const Role = db.role;
const User = db.user;
const Flights = db.flights;
const TopDest = db.topDest;
const Airlines = db.airlines;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


/*function initialCoupons(){
  Coupon.estimatedDocumentCount((err, count) => {
    if (err) console.log(err);
    if(!err){
      new Coupon({
        couponName: "AJIO",
        couponType: "Clothing",
        couponDescription: "Offers On Allen Solly & Levis",
        couponDiscount:"20",
        couponDiscountType:"%",
        couponCode: "87EA456",
        imageURL:"https://play-lh.googleusercontent.com/VqW1Cws0RtUboZ2sk5oF9ypJ6ylz-UbgpJZt-UU3-wqeS7hhb_zwBexvmx47UI7f8XM"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("Coupon Added");
      })
    }
  })
}*/
function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection");
        });
  
        new Role({
          name: "public"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'public' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });
}

app.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

require('./routes/auth.routes')(app, User);
require('./routes/user.routes')(app, User);
require('./routes/airline.routes')(app, Airlines);
require('./routes/flight.routes')(app, Flights);
require('./routes/topDest.routes')(app, TopDest);


app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`)
});