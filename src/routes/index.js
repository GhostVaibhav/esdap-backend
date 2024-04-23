const express = require("express");
const backendRouter = require("./backendRouter");
const loginRouter = require("./loginRouter");

const router = express.Router();

// esdap/v1/backend
router.use("/backend", backendRouter);
router.use("/login", loginRouter);

module.exports = router;
