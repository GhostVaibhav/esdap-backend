const express = require("express");
const backendRouter = require("./router");

const router = express.Router();

// esdap/v1/backend
router.use("/backend", backendRouter);

module.exports = router;
