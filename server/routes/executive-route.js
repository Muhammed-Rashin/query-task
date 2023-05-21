const express = require("express");
const router = express.Router();

const controller = require("../controller/executive.auth.controller");

//Api for add an executive
router.post("/add-executive", controller.addExecutive);

//Api for executive login

router.post("/login", controller.doLogin);

//Api for get all assigned queries

router.post("/get-assigned-queries", controller.getAssignedQueries);

//Api for answer query

router.post("/answer", controller.doAnswer);

module.exports = router;
