function deleteItemsObjectExistingInAnotherArrayByKey(
	arrayToCompare,
	arrayToFilter,
	key
) {
	return arrayToFilter.filter(
		(elementToFilter) =>
			!arrayToCompare.find(
				(elementToCompare) => elementToCompare[key] === elementToFilter[key]
			)
	);
}

module.exports = {
	deleteItemsObjectExistingInAnotherArrayByKey,
};
