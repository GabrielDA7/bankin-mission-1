const { client } = require("./client");
const config = require("../configs");

async function login() {
	const basicToken = Buffer.from(
		config.clientId + ":" + config.clientSecret
	).toString("base64");

	return await client("/login", {
		method: "POST",
		headers: {
			Authorization: `Basic ${basicToken}`,
			"Content-Type": "application/json",
		},
		body: {
			user: config.user,
			password: config.password,
		},
	});
}

async function token(refreshToken) {
	const formData = new URLSearchParams(
		`grant_type=refresh_token&refresh_token=${refreshToken}`
	);

	return await client("/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: formData,
	});
}

module.exports = {
	login,
	token,
};
