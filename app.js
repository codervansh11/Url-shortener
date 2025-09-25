
require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes");
const PORT = process.env.PORT || 1000;
const sequelize = require("./src/config/dbConfig")
//------------- Models----------------
const Url = require("./src/models/Url");
const User = require("./src/models/User");
//-----------------------------------
// Middleware to parse JSON
app.use(express.json());

// API routes
app.use("/api", routes);
app.use("/",routes)
// Health check route
// app.get("/", (req, res) => {
//   res.send("🚀 URL Shortener Backend is running...");
// });

// Start server

try {
  const shouldSync = 0; // default: false

  const startServer = async () => {
    if (shouldSync) {
      await sequelize.sync({alter:true}); // Only sync when explicitly allowed
      console.log("Database synced successfully...");
    } else {
      console.log("Skipping DB sync. Starting server...");
    }

    app.listen(PORT, () => {
      console.clear();
      console.log(`Server is running on PORT ${PORT}`);
    });
  };

  startServer().catch((error) => {
    console.error("Error while starting server:", error.message);
  });
} catch (error) {
  console.error("Fatal error:", error.message);
}
