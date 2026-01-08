const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
// const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "harryisagood";

//Route 1: create a user using POST "/api/auth/"
router.post(
  "/createuser",
  [
    body("firstname").isLength({ min: 3 }),
    body("lastname").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    body("phoneno").isLength({ min: 10, max:10}),
  ],
  async (req, res) => {
    // If errors return bad request
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    // check whether user exist already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success, error: "User already exist" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        firstname: req.body.firstname,
         
        lastname: req.body.lastname,
        email: req.body.email,
       
        password: secPass,
         phoneno: req.body.phoneno,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error occured");
    }
  }
);

//Route 2: authenticate a user using POST "/api/auth/login"
router.post(
  "/login",

  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],

  async (req, res) => {
    let success = false;
    // If errors return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success, error: "Invalid credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ success, error: "Invalid credentials" });
      }

      const data = {
        user: {
          id: user.id,
          firstname: user.firstname,
           
          lastname: user.lastname,
          email: user.email,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken, data });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error occured");
    }
  }
);

// // Route 3: Get loggedin user details using: POST "/api/auth/getuser" Login required
// router.post("/getuser", fetchuser, async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const user = await User.findById(userId).select("-password");
//     res.send(user);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Internal server error occured");
//   }
// });

// //Route 4: Add profile details of a user using POST "/api/auth/profiledetails" Login required

// router.put(
//   "/profiledetails/:id",
//   fetchuser,
//   [],
//   [
//     body("aadharcard").isLength({ max: 12 }),
//     body("pancard").isLength({ max: 10 }),
//     body("dateofbirth"),
//     body("gender").isLength(),
//     body("phoneno").isLength({ max: 10 }),
//     body("apartment").isLength({ max: 30 }),
//     body("street").isLength({ max: 20 }),
//     body("city").isLength({ max: 20 }),
//     body("pincode").isLength({ max: 8 }),
//     body("state").isLength({ max: 20 }),
//   ],
//   async (req, res) => {
//     try {
//       // If errors return bad request
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }

//       const {
//         aadharcard,
//         pancard,
//         dateofbirth,
//         gender,
//         phoneno,
//         apartment,
//         street,
//         city,
//         pincode,
//         state,
//       } = req.body;

//       const updatedProfile = {
//         aadharcard,
//         pancard,
//         dateofbirth,
//         gender,
//         phoneno,
//         apartment,
//         street,
//         city,
//         pincode,
//         state,
//       };

//       // Find the user by ID and update their profile details
//       const user = await User.findByIdAndUpdate(
//         req.params.id,
//         { $set: updatedProfile },
//         { new: true }
//       ).select("-password");

//       res.json(user);
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).send("Internal server error occurred");
//     }
//   }
// );

module.exports = router;


