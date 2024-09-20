const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("colors");
const connectDB = require("./db/dbinit");
connectDB();

// routes
const bookingRoutes = require("./routes/bookingRoutes");

const port = process.env.PORT || 8080;

// Middlewares
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the booking routes
app.use("/booking", bookingRoutes);

app.get("/", (req, res) => {
  res.send("welcome to TaskMate DB ");
});

// Start the Server
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`.bgGreen.black)
);
