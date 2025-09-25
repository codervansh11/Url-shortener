const QRCode = require("qrcode");
const Url = require("../models/Url");

exports.getQrCode = async (req, res) => {
  try {
    const { shortCode } = req.params;

    // Lookup short URL in DB
    const urlEntry = await Url.findOne({ where: { shortCode } });
    if (!urlEntry) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    const shortUrl = `http://localhost:1000/${urlEntry.shortCode}`;

    // Generate QR code as PNG buffer
    const qrBuffer = await QRCode.toBuffer(shortUrl);
    console.log("Generated QR code for:", shortUrl);
    // Set header and send image
    res.setHeader("Content-Type", "image/png");
    return res.send(qrBuffer);
  } catch (error) {
    console.error("Error generating QR code:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
