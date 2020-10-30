const { accountApi } = require("../api");
const transactionService = require("../services/transaction");
const { deleteItemsObjectExistingInAnotherArrayByKey } = require("../helpers");

async function getAllAccountsPages(link = null, previousAccounts = []) {
	const pageAccountsData = await accountApi.getAllAccounts(link || "/accounts");
	if (!pageAccountsData.account) pageAccountsData.account = [];

	const uniquePageAccounts = deleteItemsObjectExistingInAnotherArrayByKey(
		previousAccounts,
		pageAccountsData.account,
		"acc_number"
	);

	currentAccounts = [...previousAccounts, ...uniquePageAccounts];

	if (!pageAccountsData.link || !pageAccountsData.link.next)
		return currentAccounts;

	return await getAllAccountsPages(pageAccountsData.link.next, currentAccounts);
}

async function getAccountsDetails() {
	const accountsDetails = [];
	const accounts = await getAllAccountsPages();

	for (let i = 0; i < accounts.length; i++) {
		const accountNumber = accounts[i].acc_number;
		const accountTransactions = await transactionService.getAllAccountTransactionsPages(
			accountNumber
		);

		const formattedTransactions = accountTransactions.map((transaction) => ({
			label: transaction.label,
			amount: transaction.amount,
			currency: transaction.currency,
		}));

		accountsDetails.push({
			acc_number: accounts[i].acc_number,
			amount: accounts[i].amount,
			transactions: formattedTransactions,
		});
	}
	return accountsDetails;
}

module.exports = {
	getAccountsDetails,
};
