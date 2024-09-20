const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("colors");
const connectDB = require("./db/dbinit");
const customerRoutes = require("./routes/customerRoute");
connectDB();

const port = process.env.PORT || 8080;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("welcome to TaskMate DB ");
});

app.use("/customer", customerRoutes);
//next goes to dashboard after login

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`.bgGreen.black)
);
