// routes/dashboardRoute.js
const express = require("express");
const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

// Protected route for accessing dashboards
router.get("/dashboard", requireAuth, (req, res) => {
  // Check user type and redirect to the appropriate dashboard
  if (req.user.type === "customer") {
    // Send a response that tells the frontend this is a customer
    return res.status(200).json({ dashboard: "customer" });
  } else if (req.user.type === "professional") {
    // Send a response that tells the frontend this is a professional
    return res.status(200).json({ dashboard: "professional" });
  } else {
    return res.status(403).json({ error: "Access Denied" });
  }
});

module.exports = router;
