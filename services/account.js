
const {accountApi} = require('../api');
const transactionService = require('../services/transaction')

async function getAllAccountsPages(link = null, accounts = []) {
    const pageAccountsData = await accountApi.getAllAccounts(link);
    accounts = [...accounts, ...pageAccountsData.account];
    
    if(!pageAccountsData.link.next) {
        return accounts;
    }

    return getAllAccountsPages(pageAccountsData.link.next, accounts);
}

async function getAccountsDetails() {
        let accountsDetails = [];
        const accounts = await getAllAccountsPages()
        
        for(let i=0; i < accounts.length; i++) {
            const accountNumber = accounts[i].acc_number;
            const accountTransactions = await transactionService.getAllTransactionsPages(accountNumber);
            
            accountsDetails.push({
                acc_number: accounts[i].acc_number,
                amount: accounts[i].amount,
                transactions: {
                    label: accountTransactions.label,
                    amount: accountTransactions.amount,
                    currency: accountTransactions.currency,
                }
            });
        }

        return accountsDetails;
}

module.exports = {
    getAccountsDetails
}