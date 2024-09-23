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
const serviceRoutes = require("./routes/serviceRoute"); // Import the service routes
//const imageRoute = require("./routes/imageRoute");
const categoryRoute = require("./routes/categoryRoute");
const feedbackRoutes = require("./routes/feedbackRoute");
const bookingRoutes = require("./routes/bookingRoute");
const favouriteRoutes = require("./routes/favouriteRoute");
const fAQRoute = require("./routes/fAQRoute"); // Import FAQ routes
const pintoDashboardRoutes = require("./routes/pintoDashboardRoute");

connectDB();

const port = process.env.PORT || 8081;

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
app.use("/categories", categoryRoute);
app.use("/api/services", serviceRoutes);
app.use("/faqs", fAQRoute);
app.use("/booking", bookingRoutes); // Use the booking routes
app.use("/feedback", feedbackRoutes); //Use the feedback routes
app.use("/favourite", favouriteRoutes); //Use the favourite routes
app.use("/dashboard", pintoDashboardRoutes); //Use the dashboard routes

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`.bgGreen.black)
);
