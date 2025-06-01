import { type Item } from "@/types/item";
import { db } from "@/utils/db";

async function getAllItems() {
	const result = await db.select<Item[]>("SELECT * FROM products");
	return result;
}

export { getAllItems };
