const express =require('express');
const bodyParser = require("body-parser");
const mongoose =require('mongoose');

const usersRoutes =require('./routes/users-routes');
const HttpError = require("./models/http-error");
require('dotenv').config();

const url=process.env.MONGODB_URI;

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE');

  next();
});

app.use("/api", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could Not found this Route.", 404);
  return error;
});
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});


mongoose
  .connect(url)
  .then(() => {
    app.listen(5000, () => {
      console.log("the connection to DB is sccusse and server running on 5000");
    });
  })
  .catch((error) => {
    console.log("the connection to DB is fiald place try again", error);
  });