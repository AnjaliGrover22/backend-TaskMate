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

// routes
const imageRoute = require("./routes/imageRoute");
const feedbackRoutes = require("./routes/feedbackRoute");
const bookingRoutes = require("./routes/bookingRoute");
connectDB();

const port = process.env.PORT || 8080;

// Middlewares
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("welcome to TaskMate DB ");
});

// Use Customer and Professional routes
app.use("/customer", customerRoutes);
app.use("/professional", professionalRoutes); // add Professional routes
app.use("/mydashboard", dashboardRoutes);
app.use("/api", imageRoute);
// Use the booking routes
app.use("/", bookingRoutes);
//Use the feedback routes
app.use("/", feedbackRoutes);

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`.bgGreen.black)
);
