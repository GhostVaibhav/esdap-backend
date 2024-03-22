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

// Export the functions
module.exports = {
	_encoder,
	_decoder,
	_encryptor,
	_decryptor,
};
