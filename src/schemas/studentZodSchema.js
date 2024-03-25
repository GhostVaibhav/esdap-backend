const { object, number, array } = require("zod");

const studentZodSchema = object({
	academicScores: array(number()),
	attendancePercentage: array(number()),
	extracurricularActivities: array(number()),
	basicFitnessScores: array(number()),
	teamworkSkillScores: array(number()),
	recommendationLetters: array(number()),
	researchExperience: array(number()),
});


module.exports ={studentZodSchema};