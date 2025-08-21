const express = require("express");
const config = require("./src/config"); 
const mainRouter = require("./src/routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// Enable cross-origin requests from frontend.
app.use(
  cors({
    origin: "https://arvyax-wellness-platform.netlify.app", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// GLOBAL MIDDLEWARES

app.use(express.json());       
app.use(cookieParser()); 

// ROUTES
app.use("/api", mainRouter); 
app.get("/", (req, res) => res.send("🚀 API is running..."));

// SERVER
const startServer = async () => {
  try {
    // 1. Connect to DB
    await config.db_connection();

    // 2. Start server
    const PORT = config.serverConfig.port || 5000;
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server failed to start:", err);
  }
};

startServer();