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
	const API_URL = process.env.API_URL;
	const TESTING_API_URL = process.env.TESTING_API_URL;

	// Make an API call using the imported objects and variables

	try {
		const response = await axios.post(API_URL, {
			context: context,
			Galois_key_Keypair_A_: Galois_key_Keypair_A_,
			Cipher_academicScores: Cipher_academicScores,
			Cipher_attendancePercentage: Cipher_attendancePercentage,
			Cipher_extracurricularActivities: Cipher_extracurricularActivities,
			Cipher_basicFitnessScores: Cipher_basicFitnessScores,
			Cipher_teamworkSkillScores: Cipher_teamworkSkillScores,
			Cipher_recommendationLetters: Cipher_recommendationLetters,
			Cipher_researchExperience: Cipher_researchExperience,
		});
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error("Error making API call:", error);
		// More detailed error handling:
		if (error.response) {
			// The request was made and the server responded with a status code
			console.error("**Response Error**");
			console.error("Status:", error.response.status);
			console.error("Data:", error.response.data);
			console.error("Headers:", error.response.headers);
		} else if (error.request) {
			// The request was made but no response was received
			console.error("**Request Error**");
			console.error(error.request);
		} else {
			console.error("**Error**", error.message);
		}
	}
};

module.exports = { makeAPICall };
