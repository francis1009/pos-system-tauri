import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useItemService } from "@/composables/service/item";
import type { Item } from "@/types/item";

const { addItem } = useItemService();

const useItemMutate = () => {
	const queryClient = useQueryClient();

	const { mutateAsync: createItem } = useMutation({
		mutationFn: addItem,
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
