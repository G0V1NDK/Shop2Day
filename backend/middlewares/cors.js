function enableCors(req, res, next) {
  const allowedOrigins = [
    "http://localhost:5173",
    "https://shop-2-day.vercel.app",
    "https://shop2-nj7r52sfa-g0v1nd.vercel.app",
  ];

  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  res.setHeader("Access-Control-Allow-Credentials", "true");

  next();
}

module.exports = enableCors;
