import type { Item } from "@/types/item";
import { getAllItems } from "@/composables/database/item";

const useItemsRepository = () => {
	async function getItems(): Promise<Item[]> {
		return await getAllItems();
	}

	return {
		getItems,
	};
};

export { useItemsRepository };
