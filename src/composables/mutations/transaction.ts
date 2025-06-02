import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useTransactionService } from "@/composables/service/transaction";
import type { Transaction } from "@/types/transaction";

const { addTransaction } = useTransactionService();

const useTransactionMutation = () => {
	const queryClient = useQueryClient();

	const { mutateAsync: create } = useMutation({
		mutationFn: addTransaction,
		onSuccess: (data) => {
			queryClient.setQueryData(["transactions"], (oldData: Array<Transaction> | undefined) =>
				oldData ? [...oldData, data] : [data],
			);
		},
	});

	return {
		create,
	};
};

export { useTransactionMutation };
