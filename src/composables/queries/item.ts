import { useQuery } from "@tanstack/vue-query";
import { useItemsData } from "../data/item";

const { getItems } = useItemsData();

const useItemQueries = () => {
	function getAllItems() {
		const { data, isLoading, error } = useQuery({
			queryKey: ["items"],
			queryFn: getItems,
		});

		return { data, isLoading, error };
	}

	return {
		getAllItems,
	};
};

export { useItemQueries };
