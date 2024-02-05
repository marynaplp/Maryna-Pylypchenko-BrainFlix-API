const express = require("express");
const app = express();
const cors = require("cors");
const videoRoutes = require("./routes/videos");

// Configuration
const PORT = 3010;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/videos", videoRoutes);
app.use(express.static("public"));
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
