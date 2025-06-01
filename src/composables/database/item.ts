import { type Item } from "@/types/item";
import { db } from "@/utils/db";

async function getAllItems() {
	const result = await db.select<Item[]>("SELECT * FROM products");
	return result;
}

async function getItemByBarcode(barcode: string): Promise<Item | null> {
	const result = await db.select<Item[]>("SELECT * FROM products WHERE barcode = $1", [barcode]);
	return result.length > 0 ? result[0] : null;
}

export { getAllItems, getItemByBarcode };
