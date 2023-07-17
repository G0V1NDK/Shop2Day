const express = require('express');

const db = require('./data/database');

const enableCors = require('./middlewares/cors');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const notFoundMiddleware = require('./middlewares/not-found');

const productsRoutes = require('./routes/products-routes');
const authRoutes = require('./routes/auth-routes');
const sellerRoutes = require('./routes/seller-routes');

const app = express();

app.use(enableCors);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/products/assets', express.static('product-data'));

app.use(authRoutes);
app.use(productsRoutes);
app.use('/seller', sellerRoutes);

app.use(notFoundMiddleware);

app.use(errorHandlerMiddleware);

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log('Failed to connect to the database!');
    console.log(error);
  });