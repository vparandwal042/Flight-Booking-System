const express = require('express');
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const UserDetails  = require('../models/userDetails.model');

router.post('/signup', async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        let user = await UserDetails.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).send('That user already exisits!');
        } 
        else {  
            user = new UserDetails({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                mobile: req.body.mobile
            });
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
                res.status(200).json({ token });
            });

            res.send(user);
        }
    });

router.post("/login", async (req, res) => {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()
        });
      }
  
      const { email, password } = req.body;
      try {
        let user = await UserDetails.findOne({
          email
        });
        if (!user)
          return res.status(400).json({
            message: "User Not Exist"
          });
  
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(400).json({
            message: "Incorrect Password !"
          });
  
        const payload = {
          user: {
            id: user.id
          }
        };
  
        jwt.sign(payload, "randomString", { expiresIn: 10000 }, (err, token) => {
            if (err) throw err;
            res.status(200).json({ token });
        });

        res.send(user);
      } catch (e) {
        console.error(e);
        res.status(500).json({
          message: "Server Error"
        });
    }
});

router.route('/update/:id').put((req, res, next) => {
  UserDetails.findByIdAndUpdate(req.params.id, {
    $set: req.body
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
  UserDetails.findByIdAndRemove(req.params.id, (error, data) => {
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