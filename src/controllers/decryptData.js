const decryptData = async (
	context,
	Secret_key_Keypair_A_,
	cipherScore1,
	cipherScore2
) => {
	const SEAL = require("node-seal");
	const seal = await SEAL();

	const ckksEncoder = seal.CKKSEncoder(context);
	const decryptor = seal.Decryptor(context, Secret_key_Keypair_A_);

	// Custom function to decrypt -> decode
	const _decrypt_decode = (Cipher_A)=>{
		const Plain_A = seal.PlainText();
		decryptor.decrypt(Cipher_A, Plain_A);
		return ckksEncoder.decode(Plain_A);
	}

	const score_decoded1 =_decrypt_decode(cipherScore1);
	const score_decoded2 =_decrypt_decode(cipherScore2);

	console.log("Final score : => ", score_decoded1[0] + score_decoded2[0]);
};

module.exports = { decryptData };
