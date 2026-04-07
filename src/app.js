const express = require("express");
const schoolRoutes = require("./routes/schoolRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "School Management API is running"
  });
});

app.use("/", schoolRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

module.exports = app;
