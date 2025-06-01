import { useQuery } from "@tanstack/vue-query";
import { useItemsRepository } from "../repository/item";

const { getItems } = useItemsRepository();

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
