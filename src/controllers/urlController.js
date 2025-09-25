// src/controllers/urlController.js
const { createShortUrl } = require("../services/urlService");
const baseUrl = `http://localhost:${process.env.PORT}`;
const Url = require("../models/Url");
exports.shortenUrl = async (req, res) => {
  try {
    const { longUrl, customAlias } = req.body;
    if (!longUrl) return res.status(400).json({ error: "longUrl is required" });

    const url = await createShortUrl(longUrl, customAlias);
    console.log("Shortened URL created:", url);
    res.json({
  longUrl: url.longUrl,
  shortUrl: `${baseUrl}/${url.shortCode}`
});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// src/controllers/urlController.js

exports.redirectUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const url = await Url.findOne({ where: { shortCode } }); // safe & fast
    if (!url) return res.status(404).json({ error: "URL not found" });

    // Increment click count asynchronously
    url.clickCount += 1;
    await url.save();
    console.log("Redirecting to:", url.longUrl);
    return res.redirect(url.longUrl);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
