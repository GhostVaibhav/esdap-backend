const express = require("express");
const router = express.Router();
const { getLoginDetails } = require("../controllers/dbController");
router.use(express.json());

// esdap/v1/login/signin
router.post("/signin", async (req, res) => {
	try {
        const response = await getLoginDetails(req);
		res.status(200).json({ login: response });
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
