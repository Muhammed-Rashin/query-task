const express = require("express");
const router = express.Router();

const controller = require("../controller/admin.auth.controller");

//Api for get all queries

router.get("/get-queries", controller.getPendingQueries);

//Api for get all executives

router.get("/get-executives", controller.getExecutives);

//Api for assign executive

router.post('/assaign-query',controller.assaignQuery);


module.exports = router;
