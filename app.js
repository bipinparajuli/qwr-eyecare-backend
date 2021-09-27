"use strict";
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const nocache = require('nocache')
const cors = require("cors");
const CustomError = require("./utils/custom-error");
const ERRORS = require("./utils/errors").ERROR_CODES;


//All routes will be define here
const UserRoutes = require("./routes/userRoute");
const EventRoutes = require("./routes/eventRoute");

const options = {
  promiseLibrary: require("bluebird"),
  poolSize: 3,
  connectTimeoutMS: 1000,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
};

const connectWithRetry = function () {
  return mongoose.connect(process.env.MONGODB_URL, options, (err) => {
    if (err) {
      setTimeout(connectWithRetry, 5000);
    }
  });
};
connectWithRetry();

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on("connected", () => {
  console.log(`Mongoose default connection open to ${process.env.MONGODB_URL}`);
});

// If the connection throws an error
mongoose.connection.on("error", (err) => {
  console.log("Mongoose default connection error", err);
});

// When the connection is disconnected
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose default connection disconnected");
  //  connectWithRetry();
});

// When the connection is reconnected
mongoose.connection.on("reconnected", () => {
  console.log("Mongoose default connection reconnected");

});

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Mongoose default connection disconnected through app termination");
    process.exit(0);
  });
});

const app = express();
const server = require("http").createServer(app);
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://valor-software.github.io');
//   res.setHeader('Access-Control-Allow-Methods', 'POST');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });


// Enable CORS
app.use(cors());

// Enable CORS for verbs other than GET/HEAD/POST
app.options("*", cors());

// Enable nocache
app.use(nocache());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.status(200).send("Welcome to nodejs"));


// ROUTES
app.use("/users", UserRoutes);
app.use("/events", EventRoutes);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = CustomError._404(ERRORS.NOT_FOUND.CODE, "Not Found");
  // err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    errorCode: err.errorCode || ERRORS.UNKNOWN_ERROR.CODE,
    reason: err.statusCode === 500 ? "Something went wrong" : err.message,
    success: false,
  });
});

module.exports = {
  app,
  server,
};
