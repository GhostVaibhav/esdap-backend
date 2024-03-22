// index.js

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;
const rootRouter = require("./routes/index.js");

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/v1", rootRouter);

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
