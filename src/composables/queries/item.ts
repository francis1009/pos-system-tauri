import { useQuery } from "@tanstack/vue-query";
import { useItemsRepository } from "../service/item";

const { getItems, getItem } = useItemsRepository();

const useItemQuery = () => {
	function getAllItems() {
		const { data, isLoading, error } = useQuery({
			queryKey: ["items"],
			queryFn: getItems,
		});

		return { data, isLoading, error };
	}

	function getItemByBarcode(barcode: string) {
		const { data, isLoading, error } = useQuery({
			queryKey: ["item", barcode],
			queryFn: () => getItem(barcode),
		});

		return { data, isLoading, error };
	}

	return {
		getAllItems,
		getItemByBarcode,
	};
};

export { useItemQuery };
