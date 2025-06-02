import { getAllTransactions, createTransaction } from "@/composables/repository/transaction";

const useTransactionService = () => {
	async function getTransactions() {
		return await getAllTransactions();
	}

	async function addTransaction(cost: number) {
		return await createTransaction(cost);
	}

	return {
		getTransactions,
		addTransaction,
	};
};

export { useTransactionService };
