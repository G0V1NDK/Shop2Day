const HttpError = require('../models/http-error');

function notFoundHandler(req, res) {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
}

module.exports = notFoundHandler;
