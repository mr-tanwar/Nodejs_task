const router = require("express").Router();
const User = require("../models/userModel");
const UserRole = require("../models/users_roleModel");
const bcrypt = require("bcryptjs");
const validateRegisterInput = require("../validation/registerValidation");

// Route for Registeration

router.post("/register", async (req, res) => {
  try {
    //Structuring email
    let email = req.body.email;
    email = email.toLowerCase();
    email = email.trim();

    //hashing the password
    const password = await bcrypt.hash(req.body.password, 12);

    //Making userData for storing it in DB
    const today = new Date();
    const userData = {
      name: req.body.name,
      email: email,
      password: password,
      created: today,
    };

    // Form fields validation
    const { errors, isValid } = validateRegisterInput(req.body);

    // Checking Form inputs are valid or not
    if (!isValid) {
      return res.status(400).json(errors);
    }

    //validating for existing user
    User.findOne({ email: email })
      .then((user) => {
        if (user) {
          return res
            .status(400)
            .json({ message: `user with Email id : ${email} already exist` });
        } else {
          // Checking the DB is empty or not
          User.count((err, count) => {
            if (!err && count === 0) {
              // If user is first to register Marking its role as Admin
              UserRole.create({
                email: email,
                role: "admin",
              })
                .then(() =>
                  res
                    .status(201)
                    .json({ message: `Role of ${email} set to Admin ` })
                )
                .catch((err) =>
                  res
                    .status(400)
                    .json({ message: `Not able to set the role of ${email} ` })
                );
            } else {
              // If user is not first then marking its Role as a normal user
              UserRole.create({
                email: email,
                role: "user",
              })
                .then(() => {
                  res
                    .status(201)
                    .json({ message: `The role of ${email} is set as User` });
                })
                .catch((err) => {
                  res.status(400).json({
                    message: `Not able to set Role of ${email}  as User`,
                  });
                });
            }
          });

          // making new Entry in the DB
          User.create(userData).then(() =>
            res.status(201).json({
              message: `${email} registered as a new user`,
            })
          );
        }
      })
      .catch((err) => {
        res.send("errror: ", err);
      });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to regster the user ",
    });
  }
});

module.exports = router;
