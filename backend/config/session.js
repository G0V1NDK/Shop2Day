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
    saveUninitialized: true,
    store: createSessionStore(),
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      domain: "https://shop2-nj7r52sfa-g0v1nd.vercel.app",
    },
  };
}

module.exports = createSessionConfig;
