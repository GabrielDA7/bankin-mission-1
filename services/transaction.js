const { transactionApi } = require("../api");
const { deleteItemsObjectExistingInAnotherArrayByKey } = require("../helpers");

async function getAllAccountTransactionsPages(
	accountNumber,
	link = null,
	previousTransactions = []
) {
	try {
		const pageTransactionsData = await transactionApi.getAllTransactions(
			link || `/accounts/${accountNumber}/transactions`
		);

		if (!pageTransactionsData.transactions)
			pageTransactionsData.transactions = [];

		const uniquePageTransactions = deleteItemsObjectExistingInAnotherArrayByKey(
			previousTransactions,
			pageTransactionsData.transactions,
			"id"
		);

		const currentTransactions = [
			...previousTransactions,
			...uniquePageTransactions,
		];

		if (!pageTransactionsData.link || !pageTransactionsData.link.next)
			return currentTransactions;

		return getAllAccountTransactionsPages(
			accountNumber,
			pageTransactionsData.link.next,
			currentTransactions
		);
	} catch (error) {
		console.log(
			`An error occurred during the retrieval of the transactions of account n°${accountNumber}`
		);
		return [];
	}
}

module.exports = {
	getAllAccountTransactionsPages,
};
