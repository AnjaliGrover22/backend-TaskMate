// server.js
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("colors");
const connectDB = require("./db/dbinit");

//Importing all the routes below
const customerRoutes = require("./routes/customerRoute");
const professionalRoutes = require("./routes/professionalRoute"); // import Professional route
const serviceRoutes = require("./routes/serviceRoute"); // Import the service route
const categoryRoute = require("./routes/categoryRoute"); //Import category route
const feedbackRoutes = require("./routes/feedbackRoute"); //Import feedback route
const bookingRoutes = require("./routes/bookingRoute"); //Import booking route
const favouriteRoutes = require("./routes/favouriteRoute"); //Import favourite route
const fAQRoute = require("./routes/fAQRoute"); // Import FAQ route
const addJobRoutes = require("./routes/addJobModalRoute");
const pintoDashboardRoutes = require("./routes/pintoDashboardRoute");
const contactRoutes = require("./routes/contactRoute");
const aIHelpCenterRoutes = require("./routes/aIHelpCenterRoute");
const helpByUsProfessionalRoutes = require("./routes/helpByUsProfessionalRoute");
const helpByAIProfessionalRoutes = require("./routes/helpByAIProfessionalRoute");

connectDB();

const port = process.env.PORT || 8081;

// Middlewares
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get("/", (req, res) => {
  res.send("welcome to TaskMate DB ");
});

// All Customer and Professional routes defined here

app.use("/customer", customerRoutes); //Customer routes
app.use("/professional", professionalRoutes); // Professional routes
app.use("/categories", categoryRoute); //Categories routes
app.use("/services", serviceRoutes); //  services routes
app.use("/faqs", fAQRoute); //faq routes
app.use("/booking", bookingRoutes); // Use the booking routes
app.use("/feedback", feedbackRoutes); //Use the feedback routes
app.use("/favourite", favouriteRoutes); // //Use the favourite routes
app.use("/newJob", addJobRoutes); //Use the addNewJob routes
app.use("/dashboard", pintoDashboardRoutes); //Use the dashboard routes
app.use("/contact", contactRoutes); //Use the contact routes
app.use("/aihelpcenter", aIHelpCenterRoutes); //Use the aihelpcenter routes
app.use("/helpbyusprofessional", helpByUsProfessionalRoutes); //Use the helpbyusprofessional routes
app.use("/helpbyaiprofessional", helpByAIProfessionalRoutes); //Use the helpByAIProfessional routes

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`.bgGreen.black)
);
