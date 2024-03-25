const express = require("express");
const router = express.Router();

const { studentZodSchema } = require("../schemas/studentZodSchema");
router.use(express.json());

const { controller } = require("./../controllers/controller");

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
router.post("/data", validateStudentData, (req, res) => {
	// Process the validated student data here
	res.status(200).json({ message: "Data received successfully" });
	controller(req.body);
});

// esdap/v1/backend/version
router.post("/test", (req, res) => {
	res.send({
		message: "Backend Connection is healthy",
	});
});

module.exports = router;
