import { useQuery } from "@tanstack/vue-query";
import { useTransactionItemService } from "@/composables/service/transactionItem";

const { getTransactionItems } = useTransactionItemService();

const useTransactionItemQuery = () => {
	function getAll() {
		const { data, isLoading, error } = useQuery({
			queryKey: ["transactionItems"],
			queryFn: getTransactionItems,
		});

		return { data, isLoading, error };
	}

	return {
		getAll,
	};
};

export { useTransactionItemQuery };
