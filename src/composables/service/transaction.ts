import {
	getAllTransactions,
	getTransactionByIdWithItems as getWithId,
	createTransaction,
} from "@/composables/repository/transaction";

const useTransactionService = () => {
	async function getTransactions() {
		return await getAllTransactions();
	}

	async function addTransaction(cost: number) {
		return await createTransaction(cost);
	}

	async function getTransactionByIdWithItems(id: number) {
		return await getWithId(id);
	}

	return {
		getTransactions,
		getTransactionByIdWithItems,
		addTransaction,
	};
};

export { useTransactionService };
