import { useMutation } from "@tanstack/vue-query";
import { useTransactionService } from "@/composables/service/transaction";

const { addTransaction } = useTransactionService();

const useTransactionMutation = () => {
	const { mutateAsync: create } = useMutation({
		mutationFn: addTransaction,
	});

	return {
		create,
	};
};

export { useTransactionMutation };
