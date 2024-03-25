const { encryptData } = require("./encryptData");
const { makeAPICall } = require("./makeAPICall");
const { decryptData } = require("./decryptData");

const controller = async (data) => {
	const {
		context,
		Secret_key_Keypair_A_,
		Galois_key_Keypair_A_,
		Cipher_academicScores,
		Cipher_attendancePercentage,
		Cipher_extracurricularActivities,
		Cipher_basicFitnessScores,
		Cipher_teamworkSkillScores,
		Cipher_recommendationLetters,
		Cipher_researchExperience,
	} = await encryptData(data);

	console.log(context);

	const response = await makeAPICall(
		context,
		Galois_key_Keypair_A_,
		Cipher_academicScores,
		Cipher_attendancePercentage,
		Cipher_extracurricularActivities,
		Cipher_basicFitnessScores,
		Cipher_teamworkSkillScores,
		Cipher_recommendationLetters,
		Cipher_researchExperience
	);
	console.log(response);

	// const cipherScore1 = response.cipherScore1;
	// const cipherScore2 = response.cipherScore2;

	// console.log("this is cipherScore 1"+cipherScore1);

	// decryptData(context, Secret_key_Keypair_A_, cipherScore1, cipherScore2);
};

module.exports = { controller };
