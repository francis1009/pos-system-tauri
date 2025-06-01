import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useItemAPI } from "../api/item";
import type { Item } from "@/types/item";

const { create } = useItemAPI();

const useItemMutate = () => {
	const queryClient = useQueryClient();

	const { mutateAsync: createItem } = useMutation({
		mutationFn: create,
		onSuccess: (data) => {
			queryClient.setQueryData(["items"], (oldData: Array<Item> | undefined) =>
				oldData ? [...oldData, data] : [data],
			);
		},
	});

	return {
		createItem,
	};
};

export { useItemMutate };
