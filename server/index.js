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
const fs = require("fs");
const path = require("path");
const fileUpload = require("express-fileupload");
const Performance = require("./models/performanceModel");
const Deployment = require("./models/deployments");
const Model = require("./models/models")
const Assignment = require("./models/assignment")
const tf = require("@tensorflow/tfjs-node")
const calculateMetrics = require("./calculate_metrics.js")

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

//Performance Monitoring Data
const seedData = [
  {
    model: "Model 1",
    timestamp: new Date("2023-01-01T00:00:00Z"),
    totalPredictions: 12000,
    totalRequests: 70,
    requestOverMs: 0,
    responseTime: 70,
    executionTime: 15,
    medianPeakLoad: 3000,
    dataErrorRate: 1.5,
    systemErrorRate: 0.0,
    consumers: 2,
    cacheHitRate: 100.0,
  },
  {
    model: "Model 1",
    timestamp: new Date("2023-02-01T00:00:00Z"),
    totalPredictions: 13000,
    totalRequests: 72,
    requestOverMs: 0,
    responseTime: 68,
    executionTime: 14,
    medianPeakLoad: 3100,
    dataErrorRate: 1.1,
    systemErrorRate: 0.0,
    consumers: 2,
    cacheHitRate: 100.0,
  },
  {
    model: "Model 1",
    timestamp: new Date("2023-03-01T00:00:00Z"),
    totalPredictions: 10000,
    totalRequests: 75,
    requestOverMs: 0,
    responseTime: 69,
    executionTime: 15,
    medianPeakLoad: 3100,
    dataErrorRate: 1.7,
    systemErrorRate: 0.0,
    consumers: 2,
    cacheHitRate: 100.0,
  },
  {
    model: "Model 1",
    timestamp: new Date("2023-04-01T00:00:00Z"),
    totalPredictions: 18000,
    totalRequests: 78,
    requestOverMs: 0,
    responseTime: 69,
    executionTime: 13,
    medianPeakLoad: 3100,
    dataErrorRate: 2.1,
    systemErrorRate: 0.0,
    consumers: 2,
    cacheHitRate: 100.0,
  },
  {
    model: "Model 1",
    timestamp: new Date("2023-05-01T00:00:00Z"),
    totalPredictions: 15000,
    totalRequests: 80,
    requestOverMs: 0,
    responseTime: 70,
    executionTime: 16,
    medianPeakLoad: 3100,
    dataErrorRate: 0.7,
    systemErrorRate: 0.0,
    consumers: 2,
    cacheHitRate: 100.0,
  },
  {
    model: "Model 1",
    timestamp: new Date("2023-06-01T00:00:00Z"),
    totalPredictions: 16000,
    totalRequests: 82,
    requestOverMs: 0,
    responseTime: 67,
    executionTime: 13,
    medianPeakLoad: 3100,
    dataErrorRate: 1.1,
    systemErrorRate: 0.0,
    consumers: 2,
    cacheHitRate: 100.0,
  },
  {
    model: "Model 2",
    timestamp: new Date("2023-03-01T00:00:00Z"),
    totalPredictions: 1400,
    totalRequests: 60,
    requestOverMs: 0,
    responseTime: 72,
    executionTime: 18,
    medianPeakLoad: 3200,
    dataErrorRate: 1.2,
    systemErrorRate: 0.0,
    consumers: 2,
    cacheHitRate: 100.0,
  },
  {
    model: "Model 2",
    timestamp: new Date("2023-04-01T00:00:00Z"),
    totalPredictions: 1500,
    totalRequests: 65,
    requestOverMs: 0,
    responseTime: 72,
    executionTime: 18,
    medianPeakLoad: 3300,
    dataErrorRate: 1.3,
    systemErrorRate: 0.0,
    consumers: 2,
    cacheHitRate: 100.0,
  },
  {
    model: "Model 3",
    timestamp: new Date("2022-12-01T00:00:00Z"),
    totalPredictions: 1600,
    totalRequests: 70,
    requestOverMs: 0,
    responseTime: 65,
    executionTime: 12,
    medianPeakLoad: 3400,
    dataErrorRate: 1.4,
    systemErrorRate: 0.0,
    consumers: 4,
    cacheHitRate: 100.0,
  },
  {
    model: "Model 3",
    timestamp: new Date("2023-01-01T00:00:00Z"),
    totalPredictions: 1700,
    totalRequests: 72,
    requestOverMs: 0,
    responseTime: 65,
    executionTime: 12,
    medianPeakLoad: 3500,
    dataErrorRate: 1.5,
    systemErrorRate: 0.0,
    consumers: 4,
    cacheHitRate: 100.0,
  },
];

Performance.countDocuments({})
  .then((count) => {
    if (count === 0) {
      return Performance.insertMany(seedData);
    }
  })
  .then(() => {
    console.log("Seed data added");
  })
  .catch((error) => {
    console.error("Error seeding data:", error);
  });

//mgr data
User.findOne({ email: "admin@datapower.com" })
  .then((user) => {
    if (!user) {
      bcrypt.hash("admin", 10, function (err, hash) {
        if (err) {
          console.error("Error hashing password:", err);
          return;
        }

        User.create({
          name: "Admin",
          email: "admin@datapower.com",
          password: hash,
          access: "Manager",
          status: "Approved",
        })
          .then(() => {
            console.log("Manager data added");
          })
          .catch((err) => {
            console.error("Error manager data:", err);
          });
      });
    } else {
      console.log("Data already exists, skipping manager");
    }
  })
  .catch((err) => {
    console.error("Error manager data:", err);
  });

app.get("/api/performances", async (req, res) => {
  const { model } = req.query;

  try {
    const performances = await Performance.find({ model: model });
    res.json(performances);
    //console.log(performances)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/performances/time", async (req, res) => {
  const { model } = req.query;

  try {
    const performances = await Performance.find({ model: model });
    const data = performances.map((performance) => {
      return {
        x: performance.timestamp,
        y: performance.totalPredictions,
      };
    });
    res.json(data);
    console.log(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/perftime", async (req, res) => {
  try {
    const models = await Performance.distinct("model"); // get the list of available models
    res.json(models);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/perftime/:model", async (req, res) => {
  const model = req.params.model;

  try {
    const performances = await Performance.find({ model: model }).sort({
      timestamp: 1,
    }); // sort by timestamp in ascending order
    res.json(performances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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
        name: user.name,
        password: user.password,
        email: user.email,
        access: user.access,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "10h",
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

app.put('/users/approval/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;

    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ msg: 'Invalid status' });
    }

    const user = await User.findByIdAndUpdate(userId, { status }, { new: true });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    //To untick for testing **
    // if (status === "Approved") {
    //   // Send email notification to user
    //   const transporter = nodemailer.createTransport({
    //     service: "gmail",
    //     host: "smtp.gmail.com",
    //     port: 465,
    //     secure: true,
    //     auth: {
    //       user: "bt4301.mlops1@gmail.com",
    //       pass: "kvbrfhqsmebvtptn",
    //     },
    //   });

    //   const mailOptions = {
    //     from: process.env.EMAIL_USER,
    //     to: user.email,
    //     subject: "Account approved",
    //     html: `<p>Your account has been approved.</p>
    //            <p><a href="http://localhost:8080/login">Click here to log in.</a></p>`,
    //   };

    //   transporter.sendMail(mailOptions, (err, info) => {
    //     if (err) {
    //       console.error(err);
    //     } else {
    //       console.log("Email sent: " + info.response);
    //     }
    //   });
    // } else if (status === "Rejected") {
    //   // Send email notification to user
    //   const transporter = nodemailer.createTransport({
    //     service: "gmail",
    //     host: "smtp.gmail.com",
    //     port: 465,
    //     secure: true,
    //     auth: {
    //       user: "bt4301.mlops1@gmail.com",
    //       pass: "kvbrfhqsmebvtptn",
    //     },
    //   });

    //   const mailOptions = {
    //     from: process.env.EMAIL_USER,
    //     to: user.email,
    //     subject: "Account rejected",
    //     html: `<p>Your account has been rejected. Please try again.</p>`,
    //   };

    //   transporter.sendMail(mailOptions, (err, info) => {
    //     if (err) {
    //       console.error(err);
    //     } else {
    //       console.log("Email sent: " + info.response);
    //     }
    //   });

    //   // Delete user record from the database
    //   await User.findByIdAndDelete(userId);
    // }

    // user.status = status;
    // await user.save();

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
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
    const user = req.user;
    const { id, password } = user;

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, password);
    if (!isMatch) {
      console.log("Incorrect old password");
      return res.status(400).json({ msg: "Incorrect old password" });
    }

    if (!newPassword) {
      console.log("New password is missing");
      return res.status(400).json({ msg: "New password is missing" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.updateOne({ _id: id }, { password: hashedPassword });

    console.log("Password updated successfully");
    res.status(200).json({ msg: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

app.get("/users/me", auth, async (req, res) => {
  try {
    const user = req.user;
    console.log("user:", user);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const { id, name, email, access } = user;

    console.log("user.id:", id);
    console.log("user.name:", name);
    console.log("user.email:", email);
    console.log("user.access:", access);

    res.json({
      id,
      name: name || "",
      email: email || "",
      access: access,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// middle ware
app.use(express.static("mlModel")); //to access the files in public folder
app.use(cors()); // it enables all cors requests
app.use(fileUpload());

// file upload api
app.post("/upload", async (req, res) => {
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" });
  }
  // accessing the file
  try {
    
    const deployment_id =  req.body.deployment_id;
    const model_name = req.body.model_name;
    const model_version = req.body.model_version;
    const email = req.body.email;
    const jsonFile = req.files.jsonFile;
    const binaryFile = req.files.binaryFile;
    let jsonData
    try {
      jsonData = JSON.parse(fs.readFileSync(`./mlModel/${deployment_id}/test.json`));
    } catch (error) {
      return res.status(404).json({ message: 'Data not found' });
    }
    // console.log(deployment_id, model_name, model_version);
    //create folder if it doesnt exist
    var dir = `${__dirname}/mlModel/${deployment_id}/${model_name}/${model_version}`
    
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
    }
    // move the files to the public directory
    await jsonFile.mv(`${__dirname}/mlModel/${deployment_id}/${model_name}/${model_version}/model.json`, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send({ msg: "Error occured" });
      }

    binaryFile.mv(`${__dirname}/mlModel/${deployment_id}/${model_name}/${model_version}/weights.bin`, function (err) {
      if (err) {
        console.log(err);
      }
      
    });
    });
    
    setTimeout( async() => {
      let model_to_load 
      let auc,gini, logloss,ks,psi
      try {
        model_to_load = await tf.loadLayersModel(`file://mlModel/${deployment_id}/${model_name}/${model_version}/model.json`);
        [auc, gini, logloss, ks, psi] = await calculateMetrics(model_to_load, jsonData)
      } catch (error) {
        return res.status(500).json({msg: "Model not correct shape!"})
      }
        // console.log("auc is")
      // console.log(auc)
      const model = new Model({
        modelName: model_name,
        modelVersion: model_version,
        deploymentId: deployment_id,
        // path: dir,
        email: email,
        auc: auc,
        gini: gini,
        logloss: logloss,
        kolmogorov: ks,
        psi: psi,
        deployed :false,
        approval_status: "NA",
        replacement_reason: "NA",
        manually_apply_changes: false,
        managerComment: "NA",
        approverEmail: "NA"
      });
      await model.save();
      return res.status(200).send({msg:"Done uploading!"})
    }, 5000);
    
    
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Error occurred while processing files" });
  }
});

//Upload test_data
app.post("/data", (req, res) => {
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" });
  }
  // accessing the file
  try {
    const deployment_id =  req.body.deployment_id
    const jsonFile = req.files.test_data;
    //create folder if it doesnt exist
    var dir = `${__dirname}/mlModel/${deployment_id}`
    
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
    }
    // move the files to the public directory
    jsonFile.mv(`${__dirname}/mlModel/${deployment_id}/test.json`, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "Error occured" });
      }
    });
    return res.status(200).json({ msg: "Uploaded successfully!" });
  }catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Error occurred while processing files" });
  }
});

app.get('/deployments', async (req, res) => {
  try {
    const deployments = await Deployment.find();
    res.json(deployments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting deployments' });
  }
});


//deploy card 2
// app.get('/viewdeploy', async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const userAssignments = await Assignment.find({ user: userId });
//     const deploymentIds = userAssignments.map((assignment) => assignment.deployment);
//     const deployments = await Deployment.find({ _id: { $in: deploymentIds } });
//     res.json(deployments);
//   } catch (error) {
//     console.error('Error in /deployments GET route:', error);
//     res.status(500).json({ message: `Error retrieving deployment information: ${error.message}` });
//   }
// });

app.get('/viewdeploy/:id', async (req, res) => {
  try {
    const deployment = await Deployment.findOne({ deploymentId: req.params.id });

    console.log(deployment)
    
    if (!deployment) {
      return res.status(404).json({ message: 'Deployment not found' });
    }
    res.status(200).json(deployment);
  } catch (error) {
    console.error('Error in /viewdeploy/:id GET route:', error);
    res.status(500).json({ message: `Error retrieving deployment details: ${error.message}` });
  }
});


app.get('/viewmodel/:id', async (req, res) => {
  try {
    const model = await Model.findOne({ deploymentId: req.params.id });

    console.log(model)
    
    if (!model) {
      return res.status(404).json({ message: 'Model not found' });
    }
    res.status(200).json(model);
  } catch (error) {
    console.error('Error in /viewmodel/:id GET route:', error);
    res.status(500).json({ message: `Error retrieving model details: ${error.message}` });
  }
});


app.post('/deployments', async (req, res) => {
  console.log('Request payload:', req.body);

  try {
    const deployment = new Deployment({
      deploymentId: req.body.deploymentId,
      deploymentName: req.body.deploymentName,
      importance: req.body.importance,
      dateNow: req.body.dateNow,
      deployDescription: req.body.deployDescription,
      email: req.body.email,
    })

    await deployment.save()
    res.status(201).json({ message: 'Deployment information uploaded successfully!' })
  } catch (error) {
    res.status(500).json({ message: `Error uploading deployment information: ${error.message}` })
  }
})


app.get('/viewmodel_drift/:id', async (req, res) => {
  try {
    const model = await Model.findOne({ deploymentId: req.params.id, deployed:true});

    console.log(model)
    
    if (!model) {
      // console.log("No model found!")
      return res.status(404).json({ message: 'Model not found' });
    }
    const model_to_load = await tf.loadLayersModel(`file://mlModel/${model.deploymentId}/${model.modelName}/${model.modelVersion}/model.json`);
    let jsonDataW1, jsonDataW2, jsonDataW3, jsonDataW4;
    try {
      jsonDataW1 = JSON.parse(fs.readFileSync(`./mlModel/${model.deploymentId}/testdata/week1.json`));
      jsonDataW2 = JSON.parse(fs.readFileSync(`./mlModel/${model.deploymentId}/testdata/week2.json`));
      jsonDataW3 = JSON.parse(fs.readFileSync(`./mlModel/${model.deploymentId}/testdata/week3.json`));
      jsonDataW4 = JSON.parse(fs.readFileSync(`./mlModel/${model.deploymentId}/testdata/week4.json`));
    } catch (error) {
      return res.status(404).json({ message: 'Data not found' });
    }
      const [auc1, gini1, logloss1, ks1, psi1] = await calculateMetrics(model_to_load, jsonDataW1)
    const [auc2, gini2, logloss2, ks2, psi2] = await calculateMetrics(model_to_load, jsonDataW2)
    const [auc3, gini3, logloss3, ks3, psi3] = await calculateMetrics(model_to_load, jsonDataW3)
    const [auc4, gini4, logloss4, ks4, psi4] = await calculateMetrics(model_to_load, jsonDataW4)
    res.status(200).json({ model, metrics: { auc1, gini1, logloss1, ks1, psi1, auc2, gini2, logloss2, ks2, psi2, auc3, gini3, logloss3, ks3, psi3, auc4, gini4, logloss4, ks4, psi4}});;
  } catch (error) {
    console.error('Error in /viewdeploy/:id GET route:', error);
    res.status(500).json({ message: `Error retrieving deployment details: ${error.message}` });
  }
});

//Upload test_data
app.post("/upload_data_drift", (req, res) => {
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" });
  }
  // accessing the file
  try {
    const deployment_id =  req.body.deployment_id
    const week1 = req.files.week1;
    const week2 = req.files.week2;
    const week3 = req.files.week3;
    const week4 = req.files.week4;
    console.log(deployment_id)
    //create folder if it doesnt exist
    var dir = `${__dirname}/mlModel/${deployment_id}/testdata`
    
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
    }
    // move the files to the public directory
    week1.mv(`${__dirname}/mlModel/${deployment_id}/testdata/week1.json`, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send({ msg: "Error occured" });
      }
    });
    week2.mv(`${__dirname}/mlModel/${deployment_id}/testdata/week2.json`, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send({ msg: "Error occured" });
      }
    });
    week3.mv(`${__dirname}/mlModel/${deployment_id}/testdata/week3.json`, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send({ msg: "Error occured" });
      }
    });
    week4.mv(`${__dirname}/mlModel/${deployment_id}/testdata/week4.json`, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send({ msg: "Error occured" });
      }
    });
    return res.status(200).json({ msg: "Uploaded files" });
  }catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Error occurred while processing files" });
  }
});

// Start the server
const PORT = process.env.PORT || 27017;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const openai = require("openai");

// Set your OpenAI API key
openai.apiKey = "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";

app.post("/convert", async (req, res) => {
  const inputCode = req.body.code;

  try {
    const convertedCode = await convertCodeWithGpt3(inputCode);
    res.json({ convertedCode });
  } catch (error) {
    console.error("Error during conversion:", error);
    res.status(500).json({ error: error.message });
  }
});

async function convertCodeWithGpt3(inputCode) {
  const prompt = `Convert the following Python code to PHP:\n\n${inputCode}\n\nPHP code:`;

  const response = await openai.Completion.create({
    engine: "davinci-codex",
    prompt,
    max_tokens: 100,
    n: 1,
    stop: null,
    temperature: 0.5,
  });

  return response.choices[0].text.trim();
}

app.get('/deployments/:id', async (req, res) => {
  try {
    const deployment = await Deployment.findOne({ deploymentId: req.params.id });
    if (!deployment) {
      return res.status(404).json({ message: 'Deployment not found' });
    }
    res.status(200).json(deployment);
  } catch (error) {
    console.error('Error in /deployments/:id GET route:', error);
    res.status(500).json({ message: `Error retrieving deployment details: ${error.message}` });
  }
});



//models
app.get('/models', async (req, res) => {
  try {
    const models = await Model.find();
    console.log(models);
    res.json(models);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

app.get('/models/:id', async (req, res) => {
  try {
    const model = await Model.findById(req.params.id);
    if (!model) {
      return res.status(404).json({ msg: 'Model not found' });
    }
    res.status(200).json(model);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

app.get('/models_deploymentid/:id', async (req, res) => {
  try {
    console.log("The deploymetnId is:")
    console.log(req.params.id)
    const model = await Model.find({deploymentId: req.params.id});
    if (!model) {
      return res.status(404).json({ msg: 'Model not found' });
    }
    res.status(200).json(model);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});


//change request part by user
const transport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "bt4301.mlops1@gmail.com",
    pass: "kvbrfhqsmebvtptn",
  },
});

async function sendChangeRequestEmail(model) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'hieu98@u.nus.edu', // manager's email address
      subject: 'Change request submitted',
      text: `A change request has been submitted for model ${model.modelName} (ID: ${model._id}).\n\nReplacement Reason: ${model.replacement_reason}\nManually Apply Changes: ${model.manually_apply_changes}`,
    };

    await transport.sendMail(mailOptions);
  } catch (error) {
    console.error(`Error sending email: ${error.message}`);
  }
}

app.put('/models/:modelId/change-request', async (req, res) => {
  try {
    const { modelId } = req.params;
    const { replacement_reason, manually_apply_changes } = req.body;

    const updatedModel = await Model.findByIdAndUpdate(
      modelId,
      {
        approval_status: 'Pending',
        replacement_reason: replacement_reason,
        manually_apply_changes: manually_apply_changes,
      },
      { new: true }
    );

    await sendChangeRequestEmail(updatedModel);

    res.status(200).json({ msg: 'Change request submitted, waiting for approval' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});



//assign

// Route for the manager assign page
app.get('/manager-assign', async (req, res) => {
  try {
    const users = await User.find({ access: 'User', status: 'Approved' });
    const deployments = await Deployment.find();
    res.render('managerAssign', { users, deployments });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

app.post('/mgrassignment', async (req, res) => {
  try {
    const { deployment, users } = req.body;
    const deploymentToUpdate = await Deployment.findById(deployment);
    deploymentToUpdate.allowedUsers = Array.isArray(users) ? users : [users];
    await deploymentToUpdate.save();
    res.status(200).json({ message: 'Successfully assigned deployment' });
  } catch (err) {
    console.error('Error in mgrassignment route:', err);
    res.status(500).send('Server Error');
  }
});

//deploy card 1
app.get('/viewdeploy', async (req, res) => {
  try {
    const deployments = await Deployment.find({});
    res.status(200).json(deployments);
  } catch (error) {
    console.error('Error in /deployments GET route:', error);
    res.status(500).json({ message: `Error retrieving deployment information: ${error.message}` });
  }
});

// API endpoint for fetching assigned deployments for a specific user
app.get('/deployments/assigned/:userId', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('User ID:', userId); // Log the user ID
    const deployments = await Deployment.find({ allowedUsers: userId });
    console.log('Deployments:', deployments); // Log the fetched deployments
    res.status(200).json(deployments);

  } catch (err) {
    console.error('Error in deployments/assigned/:userId route:', err);
    res.status(500).send('Server Error');
  }
});

// API endpoint for fetching users based on access and status
app.get('/users', async (req, res) => {
  try {
    const { access, status } = req.query;
    const users = await User.find({ access, status });
    res.json(users);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});


//change request approval
// app.get('/pending', async (req, res) => {
//   try {
//     const pendingModels = await Model.find({ approval_status: "Pending" })
//       .populate({ // Add the populate() method
//         path: 'deploymentId',
//         model: Deployment,
//         select: 'deploymentName deployDescription'
//       });
//     res.json(pendingModels);
//     console.log(pendingModels);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching pending models' });
//   }
// });

app.get('/pending', async (req, res) => {
  try {
    const pendingModels = await Model.find({ approval_status: 'Pending' });
    res.json(pendingModels);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pending models' });
  }
});

// app.post('/:id/approve', async (req, res) => {
//   try {
//     const model = await Model.findById(req.params.id);
//     if (!model) {
//       return res.status(404).json({ message: 'Model not found' });
//     }
//     model.approval_status = 'Approved';
//     model.managerComment = req.body.managerComment;
//     model.approverEmail = req.body.approverEmail;
//     const updatedModel = await model.save();
//     res.json(updatedModel);
//     } catch (error) {
//     res.status(500).json({ message: 'Error approving model' });
//     }
// });

app.post("/:id/approve", async (req, res) => {
  try {
    const model = await Model.findById(req.params.id);
    if (!model) {
      return res.status(404).json({ message: "Model not found" });
    }
    model.approval_status = "Approved";
    model.managerComment = req.body.managerComment;
    model.approverEmail = req.body.approverEmail;
    const updatedModel = await model.save();

    // Send email to the user
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
      to: model.email, // User's email
      subject: "Change Request Approval",
      html: `<p>Your change request for model ${model.modelName} (version ${model.modelVersion}) has been approved by ${req.body.approverEmail}.</p>
             <p>Manager's comment: ${req.body.managerComment}</p>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ msg: "Error sending email" });
      }
      console.log("Email sent: " + info.response);
    });

    res.json(updatedModel);
  } catch (error) {
    res.status(500).json({ message: "Error approving model" });
  }
});