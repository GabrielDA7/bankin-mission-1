const { client } = require("./client");
const storage = require("../storage");

async function getAllAccounts(endpoint) {
	return await client(endpoint, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${storage.accessToken}`,
			"Content-Type": "application/json",
		},
	});
}

module.exports = {
	getAllAccounts,
};
