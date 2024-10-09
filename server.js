// server.js
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios"); // Axios to handle HTTP requests
require("dotenv").config();
require("colors");
const connectDB = require("./db/dbinit");

// Importing all the routes below
const customerRoutes = require("./routes/customerRoute");
const professionalRoutes = require("./routes/professionalRoute");
const serviceRoutes = require("./routes/serviceRoute");
const categoryRoute = require("./routes/categoryRoute");
const feedbackRoutes = require("./routes/feedbackRoute");
const bookingRoutes = require("./routes/bookingRoute");
const favouriteRoutes = require("./routes/favouriteRoute");
const fAQRoute = require("./routes/fAQRoute");
const addJobRoutes = require("./routes/addJobModalRoute");
const pintoDashboardRoutes = require("./routes/pintoDashboardRoute");
const contactRoutes = require("./routes/contactRoute");
const aIHelpCenterRoutes = require("./routes/aIHelpCenterRoute");
const helpByUsProfessionalRoutes = require("./routes/helpByUsProfessionalRoute");
const helpByAIProfessionalRoutes = require("./routes/helpByAIProfessionalRoute");
const contectUsRoutes = require("./routes/contectUsRoute");
const blogsRoutes = require("./routes/blogsRoute");

connectDB();

const port = process.env.PORT || 8081;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log requests middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome to TaskMate DB");
});

// All routes defined here
app.use("/customer", customerRoutes);
app.use("/professional", professionalRoutes);
app.use("/categories", categoryRoute);
app.use("/services", serviceRoutes);
app.use("/faqs", fAQRoute);
app.use("/booking", bookingRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/favourite", favouriteRoutes);
app.use("/newJob", addJobRoutes);
app.use("/dashboard", pintoDashboardRoutes);
app.use("/contact", contactRoutes);
app.use("/aihelpcenter", aIHelpCenterRoutes);
app.use("/helpbyusprofessional", helpByUsProfessionalRoutes);
app.use("/helpbyaiprofessional", helpByAIProfessionalRoutes);
app.use("/contectus", contectUsRoutes);
app.use("/blogs", blogsRoutes);

// === GeoNames Proxy Route ===
const GEONAMES_USERNAME = process.env.GEONAMES_USERNAME || "your_geonames_username";

app.get("/geonames", async (req, res) => {
  const { countryCode } = req.query;

  try {
    const response = await axios.get(
      `http://api.geonames.org/searchJSON?country=${countryCode}&featureClass=P&maxRows=100&username=${GEONAMES_USERNAME}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching cities from GeoNames:", error);
    res.status(500).send("Error fetching cities");
  }
});

// Start the server
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`.bgGreen.black)
);
