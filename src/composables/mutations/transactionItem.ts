import { useMutation } from "@tanstack/vue-query";
import { useTransactionItemService } from "@/composables/service/transactionItem";

const { addTransactionItems } = useTransactionItemService();

const useTransactionItemMutation = () => {
	const { mutateAsync: batchCreate } = useMutation({
		mutationFn: addTransactionItems,
	});

	return {
		batchCreate,
	};
};

export { useTransactionItemMutation };
