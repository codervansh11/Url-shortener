const rateLimit = require("express-rate-limit");

// Rate limiter: max 5 requests per minute per IP for shortening URLs
const createUrlLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5,                  // limit each IP to 5 requests per window
  message: {
    error: "Too many requests. Please try again after a minute."
  },
  standardHeaders: true,   // return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,    // disable the `X-RateLimit-*` headers
});

module.exports = { createUrlLimiter };
