const User = require("../models/userModel");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const saltRounds = 10;

const validateRegisterInput = require("../validators/register");
const validateLoginInput = require("../validators/login");

require("dotenv").config();

// @route:  POST http://localhost:3001/api/v1/users/register
// @desc:   Create a new user (register)
// @access: Public
exports.registerUser = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).send(errors);
  }

  User.findOne({ email: req.body.registerEmail }).then(user => {
    if (user) {
      return res.status(400).send({ registerEmail: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.registerName,
        email: req.body.registerEmail,
        password: req.body.registerPassword,
        repeatPassword: req.body.registerRepeatPassword
      });
      // Hash the password before saving in database
      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              res.json(user);
            })
            .catch(err => {
              console.log(err);
            });
        });
      });
    }
  });
};

// @route:  POST http://localhost:3001/api/v1/users/login
// @desc:   Login a new user (Get token)
// @access: Public
exports.loginUser = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).send(errors);
  }

  const email = req.body.loginEmail.toLowerCase();
  const password = req.body.loginPassword;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res
        .status(404)
        .send({ loginEmail: "No user found with this email!" });
    } else {
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            profilePicture: user.profilePicture
          };

          jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
              expiresIn: 31556926
            },
            (err, token) => {
              if (err) {
                res.status(400).send(err);
              }
              res.json({
                succes: true,
                token: `Bearer ${token}`
              });
            }
          );
        } else {
          return res
            .status(400)
            .send({ loginPassword: "Password is not correct!" });
        }
      });
    }
  });
};

exports.editUser = (req, res) => {
  console.log(req.user.id);

  const name = req.body.name;
  const email = req.body.email;

  User.findOneAndUpdate(
    {
      _id: req.user.id
    },
    {
      $currentDate: {
        updated_at: true
      },
      $set: {
        name: name,
        email: email
      }
    },
    {
      new: true
    }
  )
}

exports.editProfilePicture = (req, res) => {
  const profilePicture = req.file.filename;

  User.findOneAndUpdate(
    {
      _id: req.user.id
    },
    {
      $currentDate: {
        updated_at: true
      },
      $set: {
        profilePicture: profilePicture
      }
    },
    {
      new: true
    }
  ).then((user, err) => {
    if (err) {
      return res
        .status(400)
        .send({ invalidFile: "You cannot upload this kind of file!" });
    }
    // Update user object with new file.
    // User.findOne(user.profilePicture)
    //   .then(updatedUser => {
    //     updatedUser.profilePicture = user.profilePicture;
    //     updatedUser.save((u, err) => {
    //       if (err) {
    //         return res.status(400)
    //       }
    //       return res.status(200).send(u);
    //     })
    //   })
    // console.log(user);
    return res.json(user);
  });
};

// TODO
// exports.updateProfilePicture = (req, res) => {

//   const file = req.files.profilePicture;
//   const location = path.join(__dirname, `../../../../../Social-Cycling-Frontend/public/uploads/${file.name}`);

//   if (req.files === null) {
//     return res.status(400).json({ msg: "No file uploaded" })
//   }

//   file.mv(location, err => {
//     if (err) {
//       console.log(err);
//       return res.status(500).send(err);
//     }

//     return res.json({ fileName: file.name, filePath: `uploads/${file.name}` });
//   })

//   User.findByIdAndUpdate(
//     {
//       _id: req.user.id
//     },
//     {
//       $currentDate: {
//         updated_at: true
//       },
//       $set: {
//         profilePicture: file.name
//       }
//     },
//     {
//       new: true
//     }
//   );
// }

exports.loginFacebook = async (req, res) => {
  try {
    res.send("Facebook login");
  } catch (error) {
    res.status(400).send(error);
  }
};

// Helpers
exports.deleteAllUsers = (req, res) => {
  User.remove({})
    .then(users => {
      if (!users) {
        return errorHandler(404, `Could not delete users!`, next);
      }
      return res.status(200).send(users);
    })
    .catch(err => {
      return errorHandler(400, `${err}`, next);
    });
};