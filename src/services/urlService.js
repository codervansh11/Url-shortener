// src/services/urlService.js
const Url = require("../models/Url");

// Characters for Base62 short code
const BASE62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function generateShortCode(length = 6) {
  let code = "";
  for (let i = 0; i < length; i++) {
    code += BASE62[Math.floor(Math.random() * BASE62.length)];
  }
  return code;
}

async function createShortUrl(longUrl, customAlias = null) {
  let shortCode;

  if (customAlias) {
    // Check if customAlias is unique
    const existing = await Url.findOne({ where: { shortCode: customAlias } });
    if (existing) throw new Error("Custom alias already in use");
    shortCode = customAlias;
  } else {
    // Generate unique shortCode
    let isUnique = false;
    while (!isUnique) {
      shortCode = generateShortCode();
      const existing = await Url.findOne({ where: { shortCode } });
      if (!existing) isUnique = true;
    }
  }

  const url = await Url.create({ longUrl, shortCode , customAlias });
  return url;
}

module.exports = { createShortUrl };
