import { useQuery } from "@tanstack/vue-query";
import { useTransactionService } from "@/composables/service/transaction";
import type { Ref } from "vue";

const { getTransactions, getTransactionByIdWithItems } = useTransactionService();

const useTransactionQuery = () => {
	function getAll() {
		const { data, isLoading, error } = useQuery({
			queryKey: ["transactions"],
			queryFn: getTransactions,
		});

		return { data, isLoading, error };
	}

	function getWithItems(id: Ref<number>, enabled: Ref<boolean>) {
		const { data, isLoading, error } = useQuery({
			queryKey: ["transactions", id],
			queryFn: () => getTransactionByIdWithItems(id.value),
			enabled: enabled,
		});
		return { data, isLoading, error };
	}

	return {
		getAll,
		getWithItems,
	};
};

export { useTransactionQuery };
