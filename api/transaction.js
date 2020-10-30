const { client } = require("./client");
const storage = require("../storage");

async function getAllTransactions(endpoint) {
	return await client(endpoint, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${storage.accessToken}`,
			"Content-Type": "application/json",
		},
	});
}

module.exports = {
	getAllTransactions,
};
