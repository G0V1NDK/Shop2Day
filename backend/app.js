const express = require('express');

const db = require('./data/database');
const enableCors = require('./middlewares/cors');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const notFoundMiddleware = require('./middlewares/not-found');

const authRoutes = require('./routes/auth-routes');

const app = express();

app.use(enableCors);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(authRoutes);

app.use(notFoundMiddleware);

app.use(errorHandlerMiddleware);

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
    console.log("working on 3000")
  })
  .catch(function (error) {
    console.log('Failed to connect to the database!');
    console.log(error);
  });