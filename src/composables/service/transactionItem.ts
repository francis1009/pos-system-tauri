import {
	createTransactionItem,
	getAllTransactionItems,
} from "@/composables/repository/transactionItem";
import type { BaseTransactionItem } from "@/types/transaction";

const useTransactionItemService = () => {
	async function getTransactionItems() {
		return await getAllTransactionItems();
	}

	async function addTransactionItems(items: BaseTransactionItem[]) {
		const ret = items.map((item) => {
			return createTransactionItem(item);
		});

		return await Promise.all(ret);
	}

	return {
		getTransactionItems,
		addTransactionItems,
	};
};

export { useTransactionItemService };
