function notFoundHandler(req, res) {
  const error = new Error("Could not find this route.");
  error.code = 404;
  throw error;
}

module.exports = notFoundHandler;
