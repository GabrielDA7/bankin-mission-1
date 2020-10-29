const {authService, accountService} = require('./services');
const storage = require('./storage');

(async () => {
    try {
        const accessToken = await authService.getAccessToken();
        storage.accessToken = accessToken.access_token;
        const getAccountsDetails = await accountService.getAccountsDetails();
        console.log(getAccountsDetails);
    } catch(error) {
        console.error(error);
    }
})();
