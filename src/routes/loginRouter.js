const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");

router.use(express.json());

const uri = process.env.CONNECTION_URL;
const client = new MongoClient(uri);

// esdap/v1/login/signin
router.post("/signin", async (req, res) => {
	try {
        const database = client.db("admin_db");
        const collection = database.collection("credentials");
		const data = req.body.credentials;
        const count = await collection.countDocuments({ token: data });
		const response = count != 0;
		res.status(200).json({ login: response });
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
