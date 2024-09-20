// server.js
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("colors");
const connectDB = require("./db/dbinit");
const customerRoutes = require("./routes/customerRoute");
const professionalRoutes = require("./routes/professionalRoute"); // import Professional routes
const dashboardRoutes = require("./routes/dashboardRoute"); // New dashboard route

const imageRoute = require("./routes/imageRoute");
connectDB();

const port = process.env.PORT || 8080;

// Middlewares
app.use(cors());
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: false })); // Try setting this to false

app.get("/", (req, res) => {
  res.send("welcome to TaskMate DB ");
});

// Use Customer and Professional routes
app.use("/customer", customerRoutes);
app.use("/professional", professionalRoutes); // add Professional routes
app.use("/mydashboard", dashboardRoutes);
app.use("/api", imageRoute);

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`.bgGreen.black)
);
