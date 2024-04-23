const express = require("express");
const router = express.Router();

const { studentZodSchema } = require("../schemas/studentZodSchema");
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
		const response = await controller(data);
		res.status(200).json({ resultScore: response });
	} catch (error) {
		console.log(error);
	}
});

// esdap/v1/backend/version
router.post("/test", (req, res) => {
	res.send({
		message: "Backend Connection is healthy",
	});
});

module.exports = router;
