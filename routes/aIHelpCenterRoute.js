const express = require("express");
const router = express.Router();
const aIHelpCenterController = require("../controllers/aIHelpCenterController");

router.post("/", aIHelpCenterController.createChat);
router.get("/:id", aIHelpCenterController.getChat);

module.exports = router;
