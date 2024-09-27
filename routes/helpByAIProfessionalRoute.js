const express = require("express");
const router = express.Router();
const helpByAIProfessionalController = require("../controllers/helpByAIProfessionalController");

router.post("/", helpByAIProfessionalController.createChat);
router.get("/:id", helpByAIProfessionalController.getChat);

module.exports = router;
