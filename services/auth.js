const {authApi} = require('../api');


async function getAccessToken() {
    const loginResponseData = await authApi.login();
    const accessToken = await authApi.token(loginResponseData.refresh_token);
    return accessToken;
}

module.exports = {
    getAccessToken
}