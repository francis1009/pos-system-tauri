import { useQuery } from "@tanstack/vue-query";
import { useItemAPI } from "../api/item";

const { getAll, get } = useItemAPI();

const useItemQuery = () => {
	function getAllItems() {
		const { data, isLoading, error } = useQuery({
			queryKey: ["items"],
			queryFn: () => getAll(),
		});

		return { data, isLoading, error };
	}

	function getItem(barcode: string) {
		const { data, isLoading, error } = useQuery({
			queryKey: ["item", barcode],
			queryFn: () => get(barcode),
		});

		return { data, isLoading, error };
	}

	return {
		getAllItems,
		getItem,
	};
};

export { useItemQuery };
