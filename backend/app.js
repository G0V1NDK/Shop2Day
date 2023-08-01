const express = require('express');

const db = require('./data/database');

const expressSession = require("express-session");
const createSessionConfig = require("./config/session");

const enableCors = require("cors");
const errorHandlerMiddleware = require('./middlewares/error-handler');
const notFoundMiddleware = require('./middlewares/not-found');
const cartMiddleware = require("./middlewares/cart");
const updateCartPricesMiddleware = require("./middlewares/update-cart-prices");


const productsRoutes = require('./routes/products-routes');
const authRoutes = require('./routes/auth-routes');
const sellerRoutes = require('./routes/seller-routes');
const cartRoutes = require("./routes/cart-routes");

const app = express();

app.use(enableCors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));
app.use(cartMiddleware);
app.use(updateCartPricesMiddleware);

app.use('/products/assets', express.static('product-data'));

app.use(authRoutes);
app.use(productsRoutes);
app.use('/seller', sellerRoutes);
app.use("/cart", cartRoutes);

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