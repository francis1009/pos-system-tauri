import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useItemService } from "@/composables/service/item";
import type { Item } from "@/types/item";

const { addItem, editItem } = useItemService();

const useItemMutation = () => {
	const queryClient = useQueryClient();

	const { mutateAsync: create } = useMutation({
		mutationFn: addItem,
		onSuccess: (data) => {
			queryClient.setQueryData(["items"], (oldData: Array<Item> | undefined) =>
				oldData ? [...oldData, data] : [data],
			);
		},
	});

	const { mutateAsync: update } = useMutation({
		mutationFn: editItem,
		onSuccess: (data) => {
			queryClient.setQueryData(["items"], (oldData: Array<Item> | undefined) => {
				if (oldData) {
					return oldData.map((item) => (item.id === data.id ? data : item));
				}
			});
			queryClient.setQueryData(["item", data.barcode], (oldData: Item | undefined) =>
				oldData ? data : oldData,
			);
		},
	});

	return {
		create,
		update,
	};
};

export { useItemMutation };
