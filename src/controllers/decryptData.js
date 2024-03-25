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

	const score1 = seal.PlainText();
	const score2 = seal.PlainText();

	decryptor.decrypt(cipherScore1, score1);
	decryptor.decrypt(cipherScore2, score2);

	const score1_decoded = ckksEncoder.decode(score1);
	const score2_decoded = ckksEncoder.decode(score2);

	console.log("Final score : => ", score1_decoded[0] + score2_decoded[0]);
};

module.exports = { decryptData };
