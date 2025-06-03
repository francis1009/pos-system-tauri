import { useQuery } from "@tanstack/vue-query";
import { useItemService } from "@/composables/service/item";

const { getItems, getItem } = useItemService();

const useItemQuery = () => {
	function getAll() {
		const { data, isLoading, error } = useQuery({
			queryKey: ["items"],
			queryFn: getItems,
		});

		return { data, isLoading, error };
	}

	function getByBarcode(barcode: string) {
		const { data, isLoading, error } = useQuery({
			queryKey: ["item", barcode],
			queryFn: () => getItem(barcode),
		});

		return { data, isLoading, error };
	}

	return {
		getAll,
		getByBarcode,
	};
};

export { useItemQuery };
