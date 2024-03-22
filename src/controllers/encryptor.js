const SEAL = require("node-seal");

// Wait for the web assembly to fully initialize
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

// Create a new Context
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

// Create a new KeyGenerator
const keyGenerator = seal.KeyGenerator(context);

// Get the SecretKey from the keyGenerator
const Secret_key_Keypair_A_ = keyGenerator.secretKey();

// Get the PublicKey from the keyGenerator
const Public_key_Keypair_A_ = keyGenerator.createPublicKey();

////////////////////////
// Variables
////////////////////////

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