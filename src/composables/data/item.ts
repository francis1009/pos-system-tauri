import type { Item } from "@/types/item";

const useItemsData = () => {
	async function getItems(): Promise<Array<Item>> {
		return [
			{ id: "1", name: "Item 1", price: 10 },
			{ id: "2", name: "Item 2", price: 20 },
			{ id: "3", name: "Item 3", price: 30 },
			{ id: "4", name: "Item 4", price: 40 },
			{ id: "5", name: "Item 5", price: 50 },
		];
	}

	return {
		getItems,
	};
};

export { useItemsData };
