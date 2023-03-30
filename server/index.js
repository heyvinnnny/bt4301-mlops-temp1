const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const registerRoute = require('./routes/register');
const bcrypt = require('bcrypt');
//const loginRoute = require('./routes/login');
const User = require('./models/user');
const passwordResetToken = require('./models/passwordResetToken');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion } = require('mongodb');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const async = require('async');
const morgan = require('morgan');
const app = express();



app.use(morgan('combined'));

// Middleware
app.use(express.json());
app.use(cors({
  origin: '*' // replace with your client-side URL
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require('dotenv').config();

// Routes
//app.use('/api/register', registerRoute);
//app.use('/api/login', loginRoute);

//const client = new MongoClient('mongodb+srv://bt4301group1:bt4301@mlops.mxl46jm.mongodb.net/mlops?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

//MongoDB Atlas URI: mongodb+srv://bt4301group1:bt4301@mlops.mxl46jm.mongodb.net/mlops?retryWrites=true&w=majority
// Connect to MongoDB Atlas 
//Local MongoDB URI: mongodb://localhost:27017/mlops
//Need to install MongoDB first

mongoose.connect('mongodb://localhost:27017/mlops', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error(error);
});

//const collection = client.db("mlops").collection("users");

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://bt4301group1:bt4301@mlops.mxl46jm.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   if (err) {
//     console.log('Error connecting to MongoDB:', err);
//     return;
//   }
//   console.log('Connected to MongoDB');

//   const collection = client.db("mlops").collection("users");

//   app.post('/login', (req, res, next) => {
//     collection.findOne({ email: req.body.email })
//       .then(user => {
//         if (!user) {
//           return res.status(401).json({
//             title: 'user not found',
//             error: 'invalid credentials'
//           });
//         }
//         // compare password
//         bcrypt.compare(req.body.password, user.password)
//           .then(result => {
//             if (!result) {
//               return res.status(401).json({
//                 title: 'login failed',
//                 error: 'invalid credentials'
//               });
//             }
//             // create token
//             let token = jwt.sign({ userId: user._id }, 'secretkey');
//             return res.status(200).json({
//               title: 'login success',
//               token: token
//             });
//           })
//           .catch(err => {
//             return res.status(401).json({
//               title: 'login failed',
//               error: 'invalid credentials'
//             });
//           });
//       })
//       .catch(err => {
//         return res.status(500).json({
//           title: 'server error',
//           error: err
//         });
//       });
//   });

//   app.listen(3000, () => {
//     console.log('Server listening on port 3000');
//   });
// });


//login
app.post('/login', (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          title: 'user not found',
          error: 'invalid credentials'
        });
      }
      // compare password
      bcrypt.compare(req.body.password, user.password)
        .then(result => {
          if (!result) {
            return res.status(401).json({
              title: 'login failed',
              error: 'invalid credentials'
            });
          }
          // create token
          let token = jwt.sign({ userId: user._id }, 'secretkey');
          return res.status(200).json({
            title: 'login success',
            token: token
          });
        })
        .catch(err => {
          return res.status(401).json({
            title: 'login failed',
            error: 'invalid credentials'
          });
        });
    })
    .catch(err => {
      return res.status(500).json({
        title: 'server error',
        error: err
      });
    });
});


//register 1
app.post('/register', (req, res, next) => {
  const newUser = new User({
    email: req.body.email,
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 10),
    access: req.body.access
  })
  newUser.save()
    .then(() => {
      return res.status(201).json({
        title: 'Registration success',
        message: 'You have registered successfully'
      })
    })
    .catch(err => {
      return res.status(400).json({
        title: 'Error',
        error: 'Email In Use'
      })
    })
})

//forget password
// app.post('/forgetpassword', async (req, res) => {
//   try {
//     const { email } = req.body;

//     // Check if the email address provided in the request body exists in your MongoDB database.
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Generate a unique token for the password reset request.
//     const token = crypto.randomBytes(20).toString('hex');

//     // Insert a new document in the password-reset-tokens collection with the email address and token.
//     const resetToken = new PasswordResetToken({
//       email,
//       token
//     });
//     await resetToken.save();

//     // Send an email to the user with a link to a password reset page.
//     const transporter = nodemailer.createTransport({
//       service: 'Gmail',
//       auth: {
//         user: process.env.EMAIL_USERNAME,
//         pass: process.env.EMAIL_PASSWORD
//       }
//     });

//     const resetUrl = `${req.protocol}://${req.hostname}/reset-password?token=${token}`;

//     const mailOptions = {
//       from: process.env.EMAIL_USERNAME,
//       to: email,
//       subject: 'Reset Your Password',
//       text: `Hi ${user.name},\n\nYou are receiving this email because you (or someone else) has requested to reset the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`
//     };

//     await transporter.sendMail(mailOptions);

//     res.status(200).json({ message: 'Password reset link sent' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

//forget password 2 (email can finally send)
app.post('/forgetpassword', (req, res, next) => {
  async.waterfall([
    (done) => {
      crypto.randomBytes(20, (err, buf) => {
        let token = buf.toString('hex');
        done(err, token);
      });
    },
    (token, done) => {
      User.findOne({ email: req.body.email })
        .then(user => {
          if (!user) {
            return res.status(404).json({
              title: 'user not found',
              error: 'user not found with that email address'
            });
          }

          const resetToken = new passwordResetToken({
            _userId: user._id,
            token: token
          });
  
          resetToken.save()
          .then(() => {
            done(null, token, user);
          })
          .catch((err) => {
            done(err);
          });
        });
    },
    (token, user, done) => {
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'bt4301.mlops1@gmail.com',
          pass: 'kvbrfhqsmebvtptn',
        },
        });

      let mailOptions = {
        to: user.email,
        from: process.env.EMAIL_USER,
        subject: 'Password Reset Request',
        text: 'You are receiving this email because you (or someone else) has requested a password reset for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/resetpassword/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };

      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            title: 'error',
            error: 'an error occurred while sending the email'
          });
        }
        return res.status(200).json({
          title: 'success',
          message: 'an email has been sent to ' + user.email + ' with further instructions'
        });
      });
    }
  ], (err) => {
    if (err) {
      return next(err);
    }
  });
});


//reset password
// Route for resetting password
app.post('/resetpassword', (req, res) => {
  const token = req.body.token;
  const newPassword = req.body.newPassword;
  const confirmNewPassword = req.body.confirmNewPassword;

  // Check if password and confirm password match
  if (newPassword !== confirmNewPassword) {
    return res.status(400).json({
      title: 'Passwords do not match',
      error: 'Please make sure your passwords match'
    });
  }

  // Find the reset token in the database
  passwordResetToken.findOne({ token: token })
    .then(resetToken => {
      // Check if reset token exists and is not expired
      if (!resetToken || resetToken.isExpired()) {
        return res.status(400).json({
          title: 'Invalid token',
          error: 'Your reset password token is invalid or has expired. Please try again.'
        });
      }

      // Find the user associated with the reset token
      User.findOne({ _id: resetToken._userId })
        .then(user => {
          if (!user) {
            return res.status(404).json({
              title: 'User not found',
              error: 'We were unable to find a user for this token.'
            });
          }

          // Hash the new password
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newPassword, salt, (err, hash) => {
              if (err) {
                return res.status(500).json({
                  title: 'Error hashing password',
                  error: err
                });
              }

              // Update the user's password in the database
              user.password = hash;
              user.save()
                .then(() => {
                  // Delete the reset token from the database
                  passwordResetToken.findOneAndDelete({ token: token })
                    .then(() => {
                      return res.status(200).json({
                        title: 'Password reset success',
                        message: 'Your password has been successfully reset'
                      });
                    });
                });
            });
          });
        });
    });
});


const Version = require('./models/version');

const createVersionDocument = async () => {
  const newVersion = new Version({
    title: 'Example Title',
    description: 'Example Text',
    text: '1.0.0',
  });

  await newVersion.save();
};

createVersionDocument();




// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});