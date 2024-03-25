const makeAPICall = async (
	context,
	Galois_key_Keypair_A_,
	Cipher_academicScores,
	Cipher_attendancePercentage,
	Cipher_extracurricularActivities,
	Cipher_basicFitnessScores,
	Cipher_teamworkSkillScores,
	Cipher_recommendationLetters,
	Cipher_researchExperience
) => {
	const axios = require("axios");

	require("dotenv").config();
	// const API_URL = process.env.API_URL;
	const API_URL =
		"http://localhost:3000/api/v1/analytics/student-performance";

	try {
		const response = await axios.post(API_URL, {
			context,
			Galois_key_Keypair_A_,
			Cipher_academicScores,
			Cipher_attendancePercentage,
			Cipher_extracurricularActivities,
			Cipher_basicFitnessScores,
			Cipher_teamworkSkillScores,
			Cipher_recommendationLetters,
			Cipher_researchExperience,
		});
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error("Error making API call:", error);
	}
};

module.exports = { makeAPICall };
