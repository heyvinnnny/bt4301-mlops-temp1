const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const registerRoute = require('./routes/register');
const bcrypt = require('bcrypt');
//const loginRoute = require('./routes/login');
const User = require('./models/user');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion } = require('mongodb');

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

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://bt4301group1:bt4301@mlops.mxl46jm.mongodb.net/mlops?retryWrites=true&w=majority', {
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
      return res.status(200).json({
        title: 'Registration success'
      })
    })
    .catch(err => {
      return res.status(400).json({
        title: 'error',
        error: 'email in use'
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



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});