import { useQuery } from "@tanstack/vue-query";
import { useItemService } from "@/composables/service/item";

const { getItems, getItem } = useItemService();

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
