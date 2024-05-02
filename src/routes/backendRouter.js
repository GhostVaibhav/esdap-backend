const express = require("express");
const router = express.Router();

const { studentZodSchema } = require("../schemas/studentZodSchema");
const { collectData, getStudentData } = require("../controllers/dbController");
router.use(express.json());

const { controller } = require("../controllers/controller");

const validateStudentData = (req, res, next) => {
	const data = req.body;
	try {
		studentZodSchema.parse(data);
		next();
	} catch (error) {
		res.status(400).json({
			message: "Invalid student data",
			errors: error.errors,
		});
	}
};

// esdap/v1/backend/data
router.post("/data", validateStudentData, async (req, res) => {
	try {
		const data = req.body;
		var result = await controller(data);
		if(result > 100)	result = 100
		
		// Upload the result to MongoDB
		collectData(data, result)

		res.status(200).json({ resultScore: result });
	} catch (error) {
		console.log(error);
	}
});

router.get("/showall", async (req, res) => {
	try {
		const result = await getStudentData();
		res.status(200).json({ result });
	} catch (error) {
		console.log(error);
	}
})

// esdap/v1/backend/version
router.post("/test", (req, res) => {
	res.send({
		message: "Backend Connection is healthy",
	});
});

module.exports = router;
