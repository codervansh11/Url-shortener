// routes/index.js
const express = require("express");
const router = express.Router();

//controllers
const { shortenUrl } = require("../src/controllers/urlController");
const { redirectUrl } = require("../src/controllers/urlController");
const { createUrlLimiter } = require("../src/middlewares/rateLimiter");
const { getQrCode } = require("../src/controllers/qrController");


router.post("/shorten", createUrlLimiter, shortenUrl);
router.get("/:shortCode", redirectUrl);
router.get("/qr/:shortCode", getQrCode);

router.get("/", (req, res) => {
  res.send("🚀 URL Shortener Backend is running...");
});

// Example: shorten URL route
router.get("/hello", (req, res) => {
  res.json({ message: "API is working!" });
});

// Export router
module.exports = router;
//  192.168.68.54