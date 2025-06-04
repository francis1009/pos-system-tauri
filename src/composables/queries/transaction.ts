import { useQuery } from "@tanstack/vue-query";
import { useTransactionService } from "@/composables/service/transaction";

const { getTransactions, getTransactionByIdWithItems } = useTransactionService();

const useTransactionQuery = () => {
	function getAll() {
		const { data, isLoading, error } = useQuery({
			queryKey: ["transactions"],
			queryFn: getTransactions,
		});

		return { data, isLoading, error };
	}

	function getWithItems(id: number) {
		const { data, isLoading, error } = useQuery({
			queryKey: ["transactions", id],
			queryFn: () => getTransactionByIdWithItems(id),
		});
		return { data, isLoading, error };
	}

	return {
		getAll,
		getWithItems,
	};
};

export { useTransactionQuery };
