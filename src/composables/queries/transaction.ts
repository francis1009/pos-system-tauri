import { useQuery } from "@tanstack/vue-query";
import { useTransactionService } from "@/composables/service/transaction";

const { getTransactions } = useTransactionService();

const useTransactionQuery = () => {
	function getAll() {
		const { data, isLoading, error } = useQuery({
			queryKey: ["transactions"],
			queryFn: getTransactions,
		});

		return { data, isLoading, error };
	}

	return {
		getAll,
	};
};

export { useTransactionQuery };
