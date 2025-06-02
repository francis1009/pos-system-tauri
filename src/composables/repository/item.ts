import type { Item, BaseItem } from "@/types/item";
import { db } from "@/utils/db";

async function getAllItems() {
	const result = await db.select<Item[]>("SELECT * FROM products");
	return result;
}

async function getItemByBarcode(barcode: string): Promise<Item | null> {
	const result = await db.select<Item[]>("SELECT * FROM products WHERE barcode = $1", [barcode]);
	return result.length > 0 ? result[0] : null;
}

async function createItem(item: BaseItem): Promise<Item> {
	const res = await db.execute("INSERT INTO products (name, barcode, price) VALUES ($1, $2, $3)", [
		item.name,
		item.barcode,
		item.price,
	]);
	if (!res.lastInsertId) throw new Error("Failed to create item");
	const toReturn: Item = {
		id: res.lastInsertId,
		...item,
	};
	return toReturn;
}

export { getAllItems, getItemByBarcode, createItem };
