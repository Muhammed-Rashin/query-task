const express = require("express");
const router = express.Router();

const controller = require("../controller/user.auth.controller");

//Route for testing
router.get("/", controller.test);

//Api for signup
router.post("/signup", controller.doSignup);

//Api for login

router.post("/login", controller.doLogin);

//Api for ask new queries

router.post("/ask", controller.ask);

//Api for get all answered queries

router.get("/get-answerd-queries", controller.getAnswerdQueries);

//Api for rate an answer

router.post("/rate-answer", controller.rateAnswer);

module.exports = router;
