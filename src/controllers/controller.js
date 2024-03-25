const encryptData = require("./encryptionLogic");
const makeAPICall = require("./makeAPICall");
const decryptData = require("./decryptionLogic");

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
	} = encryptData(data);

	const response = makeAPICall(
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
	const cipherScore1 = response.cipherScore1;
	const cipherScore2 = response.cipherScore2;

	decryptData(context, Secret_key_Keypair_A_, cipherScore1, cipherScore2);
};
