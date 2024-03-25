const encryptData = async ({
	academicScores,
	attendancePercentage,
	extracurricularActivities,
	basicFitnessScores,
	teamworkSkillScores,
	recommendationLetters,
	researchExperience,
}) => {
	// testing by mock data

	// importing mock data for testing
	// const {
	// 	academicScores,
	// 	attendancePercentage,
	// 	extracurricularActivities,
	// 	basicFitnessScores,
	// 	teamworkSkillScores,
	// 	recommendationLetters,
	// 	researchExperience,
	// } = require("../../mock/mockData");

	// testing end

	const SEAL = require("node-seal");
	const seal = await SEAL();

	////////////////////////
	// Encryption Parameters
	////////////////////////

	const schemeType = seal.SchemeType.ckks;
	const securityLevel = seal.SecurityLevel.tc128;
	const polyModulusDegree = 8192;
	const bitSizes = [60, 20, 20, 20, 20, 60];

	const encParms = seal.EncryptionParameters(schemeType);

	encParms.setPolyModulusDegree(polyModulusDegree);

	// Create a suitable set of CoeffModulus primes
	encParms.setCoeffModulus(
		seal.CoeffModulus.Create(polyModulusDegree, Int32Array.from(bitSizes))
	);

	////////////////////////
	// Context
	////////////////////////

	// Create a new Context (to be passed on to analytic server)
	const context = seal.Context(encParms, true, securityLevel);

	// Helper to check if the Context was created successfully
	if (!context.parametersSet()) {
		throw new Error(
			"Could not set the parameters in the given context. Please try different encryption parameters."
		);
	}

	////////////////////////
	// Keys
	////////////////////////

	const keyGenerator = seal.KeyGenerator(context);
	const Secret_key_Keypair_A_ = keyGenerator.secretKey();
	const Public_key_Keypair_A_ = keyGenerator.createPublicKey();
	const Galois_key_Keypair_A_ = keyGenerator.createGaloisKeys();

	////////////////////////
	// Instances
	////////////////////////

	// const evaluator = seal.Evaluator(context);

	const ckksEncoder = seal.CKKSEncoder(context);

	const encryptor = seal.Encryptor(context, Public_key_Keypair_A_);

	// Custom Function
	// Encoder
	const _encoder = (array, Plain_A) => {
		ckksEncoder.encode(Float64Array.from(array), Math.pow(2, 32), Plain_A);
	};

	// ////////////////////////
	// // Variables
	// ////////////////////////

	// Create the PlainText(s)
	const Plain_academicScores = seal.PlainText();
	const Plain_attendancePercentage = seal.PlainText();
	const Plain_extracurricularActivities = seal.PlainText();
	const arrayasicFitnessScores = seal.PlainText();
	const Plain_teamworkSkillScores = seal.PlainText();
	const Plain_recommendationLetters = seal.PlainText();
	const Plain_researchExperience = seal.PlainText();

	// Create the CipherText(s)
	// const Cipher_A = seal.CipherText();
	const Cipher_academicScores = seal.CipherText();
	const Cipher_attendancePercentage = seal.CipherText();
	const Cipher_extracurricularActivities = seal.CipherText();
	const Cipher_basicFitnessScores = seal.CipherText();
	const Cipher_teamworkSkillScores = seal.CipherText();
	const Cipher_recommendationLetters = seal.CipherText();
	const Cipher_researchExperience = seal.CipherText();

	// Encoding (all inputs are array)
	_encoder(academicScores, Plain_academicScores);
	_encoder(attendancePercentage, Plain_attendancePercentage);
	_encoder(extracurricularActivities, Plain_extracurricularActivities);
	_encoder(basicFitnessScores, arrayasicFitnessScores);
	_encoder(teamworkSkillScores, Plain_teamworkSkillScores);
	_encoder(recommendationLetters, Plain_recommendationLetters);
	_encoder(researchExperience, Plain_researchExperience);

	// Encrypting
	encryptor.encrypt(Plain_academicScores, Cipher_academicScores);
	encryptor.encrypt(Plain_attendancePercentage, Cipher_attendancePercentage);
	encryptor.encrypt(
		Plain_extracurricularActivities,
		Cipher_extracurricularActivities
	);
	encryptor.encrypt(arrayasicFitnessScores, Cipher_basicFitnessScores);
	encryptor.encrypt(Plain_teamworkSkillScores, Cipher_teamworkSkillScores);
	encryptor.encrypt(
		Plain_recommendationLetters,
		Cipher_recommendationLetters
	);
	encryptor.encrypt(Plain_researchExperience, researchExperience);

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

// Note:
// cipher text that we are generating is in the form of an object
// {
//   instance: [Getter],
//   unsafeInject: [Function: unsafeInject],
//   delete: [Function: delete],
//   reserve: [Function: reserve],
//   resize: [Function: resize],
//   release: [Function: release],
//   coeffModulusSize: [Getter],
//   polyModulusDegree: [Getter],
//   size: [Getter],
//   sizeCapacity: [Getter],
//   isTransparent: [Getter],
//   isNttForm: [Getter],
//   parmsId: [Getter],
//   scale: [Getter],
//   setScale: [Function: setScale],
//   pool: [Getter],
//   save: [Function: save],
//   saveArray: [Function: saveArray],
//   load: [Function: load],
//   loadArray: [Function: loadArray],
//   copy: [Function: copy],
//   clone: [Function: clone],
//   move: [Function: move]
