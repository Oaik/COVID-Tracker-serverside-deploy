const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// config
const config = require("./config.json");

// routes
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const logRoute = require('./routes/log');
const dashboardRoute = require('./routes/dashboard');

const app = express();

// connect database
mongoose.connect(config.monogoURL, { useNewUrlParser: true}).catch( (err) => {
  console.error("Error while connecting to the database", err);
});

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// routes
app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/api', logRoute);
app.use('/dashboard', dashboardRoute);

// running the server
app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});