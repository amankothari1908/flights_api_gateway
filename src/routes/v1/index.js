const express = require("express");

const router = express.Router();

const userRoute = require("./user.route");

router.use("/signup", userRoute);

module.exports = router;
