const express = require("express");
const axios = require("axios");
require("dotenv").config();
const API_URL = process.env.API_URL;

const app = express();

const {
	context,
	Cipher_academicScores,
	Cipher_attendancePercentage,
	Cipher_extracurricularActivities,
	Cipher_basicFitnessScores,
	Cipher_teamworkSkillScores,
	Cipher_recommendationLetters,
	Cipher_researchExperience,
} = require("./encryptionLogic");

// Make an API call using the imported objects and variables
async function makeAPICall() {
	try {
		const response = await axios.get(API_URL, {
			context,
			Cipher_academicScores,
			Cipher_attendancePercentage,
			Cipher_extracurricularActivities,
			Cipher_basicFitnessScores,
			Cipher_teamworkSkillScores,
			Cipher_recommendationLetters,
			Cipher_researchExperience,
		});
		console.log(response.data);
	} catch (error) {
		console.error("Error making API call:", error);
	}
}

// Call the function to make the API call
makeAPICall();
