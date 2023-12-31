const expressSession = require("express-session");
const mongoDbStore = require("connect-mongodb-session");

require("dotenv").config();

function createSessionStore() {
  const MongoDBStore = mongoDbStore(expressSession);

  const store = new MongoDBStore({
    uri: process.env.MONGODB_URL,
    databaseName: "Shop2Day",
    collection: "sessions",
  });

  return store;
}

function createSessionConfig() {
  return {
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000,
      sameSite: 'none', // Add this line to set SameSite attribute
      secure: true,     // Make sure to set secure to true when using SameSite: None
    },
  };
}

module.exports = createSessionConfig;
