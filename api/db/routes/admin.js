const express = require('express');
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const Admin  = require('../models/admin.model');

router.post("/login", async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { email, password } = req.body;
    console.log(email, password)
    try {
      let admin = await Admin.findOne({
        email
      });
      console.log(admin)
      if (!admin)
        return res.status(400).json({
          message: "admin Not Exist"
        });

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password !"
        });

      const payload = {
        admin: {
          id: admin.id
        }
      };

      jwt.sign(payload, "randomString", { expiresIn: 10000 }, (err, token) => {
          if (err) throw err;
          res.status(200).json({ token }).send(admin);
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
  }
});

module.exports = router;