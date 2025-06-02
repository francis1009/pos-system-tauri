import type { Item, BaseItem } from "@/types/item";
import { getAllItems, createItem, getItemByBarcode } from "@/composables/repository/item";

const useItemsRepository = () => {
	async function getItems(): Promise<Item[]> {
		return await getAllItems();
	}

	async function getItem(barcode: string): Promise<Item | null> {
		return await getItemByBarcode(barcode);
	}

	async function addItem(item: BaseItem): Promise<Item> {
		return await createItem(item);
	}

	return {
		getItems,
		getItem,
		addItem,
	};
};

export { useItemsRepository };
