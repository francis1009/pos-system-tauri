import type { Item, CreateItem } from "@/types/item";
import { db } from "@/utils/db";
import type { QueryResult } from "@tauri-apps/plugin-sql";

const useItemAPI = () => {
	async function getAll(): Promise<Array<Item>> {
		const res = await db.select<Array<Item>>("SELECT * FROM products");
		return res;
	}

	async function get(barcode: string): Promise<Item> {
		const res = await db.select<Item>("SELECT * FROM products WHERE barcode = $1", [barcode]);
		return res;
	}

	async function create(item: CreateItem): Promise<QueryResult> {
		const res = await db.execute(
			"INSERT INTO products (name, barcode, price) VALUES ($1, $2, $3)",
			[item.name, item.barcode, item.price],
		);
		return res;
	}

	return {
		getAll,
		get,
		create,
	};
};

export { useItemAPI };
