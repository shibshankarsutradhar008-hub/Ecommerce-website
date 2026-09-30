require("dotenv").config();

const dns = require("dns");
const mongoose = require("mongoose");

// Use reliable public DNS servers for MongoDB SRV lookup
dns.setServers(["8.8.8.8", "1.1.1.1"]);

console.log("Mongo URI exists:", !!process.env.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

module.exports = mongoose.connection;