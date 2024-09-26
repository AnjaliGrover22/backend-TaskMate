const express = require("express");
const router = express.Router();
const aIHelpCenterController = require("../controllers/aIHelpCenterController");

router.post("/", aIHelpCenterController.getAIResponse);

module.exports = router;
