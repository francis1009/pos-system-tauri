import type { Item, BaseItem } from "@/types/item";
import {
	getAllItems,
	createItem,
	getItemByBarcode,
	updateItem,
} from "@/composables/repository/item";

const useItemService = () => {
	async function getItems(): Promise<Item[]> {
		return await getAllItems();
	}

	async function getItem(barcode: string): Promise<Item | null> {
		return await getItemByBarcode(barcode);
	}

	async function addItem(item: BaseItem): Promise<Item> {
		return await createItem(item);
	}

	async function editItem(item: Item): Promise<Item> {
		return await updateItem(item);
	}

	return {
		getItems,
		getItem,
		addItem,
		editItem,
	};
};

export { useItemService };
