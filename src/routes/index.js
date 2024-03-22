const express = require("express");
const backendRouter = require("./backend");

const router = express.Router();
router.use("/backend", backendRouter);

module.exports = router;
