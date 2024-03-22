(async () => {
	const SEAL = require("node-seal");
	const seal = await SEAL();

	////////////////////////
	// Encryption Parameters
	////////////////////////

	// Create a new EncryptionParameters
	const schemeType = seal.SchemeType.ckks;
	const securityLevel = seal.SecurityLevel.tc128;
	const polyModulusDegree = 4096;
	const bitSizes = [46, 16, 46];

	const encParms = seal.EncryptionParameters(schemeType);

	// Assign Poly Modulus Degree
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

	// Create a new KeyGenerator (use uploaded keys if applicable)
	const keyGenerator = seal.KeyGenerator(context);

	// Get the SecretKey from the keyGenerator
	const Secret_key_Keypair_A_ = keyGenerator.secretKey();

	// Get the PublicKey from the keyGenerator
	const Public_key_Keypair_A_ = keyGenerator.createPublicKey();

	// Create a new GaloisKey
	const Galois_key_Keypair_A_ = keyGenerator.createGaloisKeys();

	// Create a new RelinKey
	// const Relin_key_Keypair_A_ = keyGenerator.createRelinKeys();

	////////////////////////
	// Instances
	////////////////////////

	// Create an Evaluator
	const evaluator = seal.Evaluator(context);

	// Create a CkksEncoder (only ckks SchemeType)
	const ckksEncoder = seal.CKKSEncoder(context);

	// Create an Encryptor
	const encryptor = seal.Encryptor(context, Public_key_Keypair_A_);

	// Create a Decryptor
	const decryptor = seal.Decryptor(context, Secret_key_Keypair_A_);

	// Custom Functions
	// Encode data to a PlainText
	const _encoder = (array, Plain_A) => {
		ckksEncoder.encode(Float64Array.from(array), Math.pow(2, 16), Plain_A);
	};

	// Encode data to a CipherText
	const _decoder = (Plain_A) => {
		return ckksEncoder.decode(Plain_A);
	};

	// Encrypt a PlainText
	const _encryptor = (Plain_A, Cipher_A) => {
		encryptor.encrypt(Plain_A, Cipher_A);
	};

	// Decrypt a CipherText
	const _decryptor = (Cipher_A, Plain_A) => {
		decryptor.decrypt(Cipher_A, Plain_A);
	};

	// ////////////////////////
	// // Variables
	// ////////////////////////

	// Create the PlainText(s)
	const Plain_academicScores = seal.PlainText();
	const Plain_attendancePercentage = seal.PlainText();
	const Plain_extracurricularActivities = seal.PlainText();
	const Plain_basicFitnessScores = seal.PlainText();
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
	_encoder(input1, Plain_academicScores);
	_encoder(input2, Plain_attendancePercentage);
	_encoder(input3, Plain_extracurricularActivities);
	_encoder(input4, Plain_basicFitnessScores);
	_encoder(input5, Plain_teamworkSkillScores);
	_encoder(input6, Plain_recommendationLetters);
	_encoder(input7, Plain_researchExperience);

	// Encrypting
	_encryptor(Plain_academicScores, Cipher_academicScores);
	_encryptor(Plain_attendancePercentage, Cipher_attendancePercentage);
	_encryptor(
		Plain_extracurricularActivities,
		Cipher_extracurricularActivities
	);
	_encryptor(Plain_basicFitnessScores, Cipher_basicFitnessScores);
	_encryptor(Plain_teamworkSkillScores, Cipher_teamworkSkillScores);
	_encryptor(Plain_recommendationLetters, Cipher_recommendationLetters);
	_encryptor(Plain_researchExperience, Cipher_researchExperience);

	//  Trial code  
	// const dataToEncrypt = [1, 2, 3, 4, 5];
	// const plaintext = seal.PlainText();
	// const ciphertext = seal.CipherText();
	// _encoder(dataToEncrypt, plaintext);
	// _encryptor(plaintext, ciphertext);
	// console.log("Encrypted ciphertext:", ciphertext);
	// console.log(typeof ciphertext);

	
})();














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
	// }
