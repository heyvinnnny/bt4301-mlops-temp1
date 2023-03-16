const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const registerRoute = require('./routes/register');
const bcrypt = require('bcrypt');
//const loginRoute = require('./routes/login');
const User = require('./models/user');
const PasswordResetToken = require('./models/passwordResetToken');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion } = require('mongodb');
const crypto = require('crypto');
const nodemailer = require('nodemailer');


const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

// Use the register router for /api/register requests
//app.use(registerRoute);
//app.use(loginRoute);

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

//register 2

// app.post('/register', async (req, res) => {
//   try {
//     const { name, email, password, confirmPassword, access } = req.body;

//     // Check if user with same email already exists
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Check if passwords match
//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: 'Passwords do not match' });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const newUser = new User({ name, email, password: hashedPassword, access });
//     const savedUser = await newUser.save();

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

//forget password
// app.post('/forgotpassword', async (req, res) => {
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

//forget password 2

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});