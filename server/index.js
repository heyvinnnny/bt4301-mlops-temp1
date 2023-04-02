const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require("./models/user");
//const passwordResetToken = require('./models/passwordResetToken');
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const async = require("async");
const morgan = require("morgan");
const app = express();
const auth = require("./middleware/auth");

app.use(morgan("combined"));

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "*", // replace with your client-side URL
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require("dotenv").config();

mongoose
  .connect("mongodb://127.0.0.1:27017/mlops", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error(error);
  });

//login to check for pending account (can login too)
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    if (user.status === "Pending") {
      return res
        .status(403)
        .json({ msg: "Account is still pending for approval" });
    }

    const payload = {
      user: {
        id: user._id,
        access: user.access,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        access: user.access,
        // Include any other necessary fields
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

//register 2 with account status (can register but redirecting seems weird)
app.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, password, access } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      access,
      status: "Pending",
    });

    await newUser.save();

    // Send email to manager
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "bt4301.mlops1@gmail.com",
        pass: "kvbrfhqsmebvtptn",
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "e0544404@u.nus.edu", // Manager's email
      subject: "New user registration",
      html: `<p>A new user has registered: ${name} (${email}).</p>
             <p><a href="http://localhost:8080/login">Click here to log in and review the account request.</a></p>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ msg: "Error sending email" });
      }
      console.log("Email sent: " + info.response);
    });

    res.status(201).json({ msg: "User registered, pending approval" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

app.get("/users/pending", auth, async (req, res) => {
  try {
    const pendingUsers = await User.find({ status: "Pending" });
    res.json(pendingUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

app.put("/users/approval/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ msg: "Invalid status" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { status },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

//Randomly generated password for user
function generateRandomPassword(length = 8) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
}

app.post("/forgetpassword", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const newPassword = generateRandomPassword();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.updateOne({ email }, { $set: { password: hashedPassword } });

    const transporter = nodemailer.createTransport({
      // Configure your email service and credentials
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "bt4301.mlops1@gmail.com",
        pass: "kvbrfhqsmebvtptn",
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your new password",
      html: `<p>You have forgotten your password and we will be issuing you a random password</p>
      <p>Your new password is: <b>${newPassword}</b></p>
      <p>Please log in with this password and change it to a new one as soon as possible.</p>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ msg: "Error sending email" });
      }
      console.log("Email sent: " + info.response);
    });

    res.status(200).json({ msg: "New password sent to your email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

app.put("/resetpassword", auth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect old password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ msg: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

app.get("/users/me", auth, async (req, res) => {
  try {
    const user = req.user;
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      // add other necessary fields
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

//run model
// app.post("/runmodel", (req, res) => {
//   const { model, data } = req.body;
//   console.log(model);
//   console.log(data);
//   const modelPath = path.join(__dirname, "models", model);

//   // Load the python model
//   const pyshell = new PythonShell(modelPath);

//   // Send the data to the python model
//   pyshell.send(JSON.stringify(data));

//   // Get the result from the python model
//   pyshell.on("message", (message) => {
//     console.log(message);
//     res.status(200).json({ result: message });
//   });
// });

// Start the server
const PORT = process.env.PORT || 27017;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
