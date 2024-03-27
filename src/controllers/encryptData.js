const encryptData = async ({
	academicScores,
	attendancePercentage,
	extracurricularActivities,
	basicFitnessScores,
	teamworkSkillScores,
	recommendationLetters,
	researchExperience,
}) => {
	const SEAL = require("node-seal");
	const seal = await SEAL();

	const schemeType = seal.SchemeType.ckks;
	const securityLevel = seal.SecurityLevel.tc128;
	const polyModulusDegree = 8192;
	const bitSizes = [60, 20, 20, 20, 20, 60];

	const encParms = seal.EncryptionParameters(schemeType);

	encParms.setPolyModulusDegree(polyModulusDegree);

	encParms.setCoeffModulus(
		seal.CoeffModulus.Create(polyModulusDegree, Int32Array.from(bitSizes))
	);

	const context = seal.Context(encParms, true, securityLevel);

	if (!context.parametersSet()) {
		throw new Error(
			"Could not set the parameters in the given context. Please try different encryption parameters."
		);
	}

	const keyGenerator = seal.KeyGenerator(context);
	const Secret_key_Keypair_A_ = keyGenerator.secretKey();
	const Public_key_Keypair_A_ = keyGenerator.createPublicKey();
	const Galois_key_Keypair_A_ = keyGenerator.createGaloisKeys();

	const ckksEncoder = seal.CKKSEncoder(context);
	const encryptor = seal.Encryptor(context, Public_key_Keypair_A_);

	// Custom Function to encode and encrypt data

	const _encode_encrypt = (array, Plain_A, Cipher_A) => {
		ckksEncoder.encode(Float64Array.from(array), Math.pow(2, 16), Plain_A);
		encryptor.encrypt(Plain_A, Cipher_A);
	};

	const Plain_academicScores = seal.PlainText();
	const Plain_attendancePercentage = seal.PlainText();
	const Plain_extracurricularActivities = seal.PlainText();
	const Plain_basicFitnessScores = seal.PlainText();
	const Plain_teamworkSkillScores = seal.PlainText();
	const Plain_recommendationLetters = seal.PlainText();
	const Plain_researchExperience = seal.PlainText();

	const Cipher_academicScores = seal.CipherText();
	const Cipher_attendancePercentage = seal.CipherText();
	const Cipher_extracurricularActivities = seal.CipherText();
	const Cipher_basicFitnessScores = seal.CipherText();
	const Cipher_teamworkSkillScores = seal.CipherText();
	const Cipher_recommendationLetters = seal.CipherText();
	const Cipher_researchExperience = seal.CipherText();

	_encode_encrypt(
		academicScores,
		Plain_academicScores,
		Cipher_academicScores
	);
	_encode_encrypt(
		attendancePercentage,
		Plain_attendancePercentage,
		Cipher_attendancePercentage
	);
	_encode_encrypt(
		extracurricularActivities,
		Plain_extracurricularActivities,
		Cipher_extracurricularActivities
	);

	_encode_encrypt(
		basicFitnessScores,
		Plain_basicFitnessScores,
		Cipher_basicFitnessScores
	);
	_encode_encrypt(
		teamworkSkillScores,
		Plain_teamworkSkillScores,
		Cipher_teamworkSkillScores
	);

	_encode_encrypt(
		recommendationLetters,
		Plain_recommendationLetters,
		Cipher_recommendationLetters
	);

	_encode_encrypt(
		researchExperience,
		Plain_researchExperience,
		Cipher_researchExperience
	);

	return {
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
	};
};

module.exports = {
	encryptData,
};
