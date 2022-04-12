const express = require("express");
const router = express.Router();

router.use("/phoneValidation-api", require("./api"));

module.exports = router;
