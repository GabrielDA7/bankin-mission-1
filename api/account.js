const {client} = require('./client');
const storage = require('../storage');

async function getAllAccounts(link) {
    const endpoint = link ? link : "/accounts";
    return await client(endpoint, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${storage.accessToken}`,
            "Content-Type": "application/json"
        }
    });
}

module.exports = {
    getAllAccounts
}