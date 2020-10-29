
const {transactionApi} = require('../api');

async function getAllTransactionsPages(accountNumber, link = null, transactions = []) {
    if(!accountNumber) {
        throw new Error("Account number is required");
    }

    const pageTransactionsData = await transactionApi.getAllTransactions(link || `/accounts/${accountNumber}/transactions`);
    transactions = [...transactions, ...pageTransactionsData.transactions];
    if(!pageTransactionsData.link.next) {
        return transactions;
    }

    return getAllTransactionsPages(accountNumber, pageTransactionsData.link.next, transactions);
}

module.exports = {
    getAllTransactionsPages
}