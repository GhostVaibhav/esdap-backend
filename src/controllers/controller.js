const { encrypt_operation_decrypt } = require("./encrypt_operation_decrypt");

const controller = async (data) => {
	const ans = await encrypt_operation_decrypt(data);
	console.log(ans);
	return ans;
};

module.exports = { controller };
