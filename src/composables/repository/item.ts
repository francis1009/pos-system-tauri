import type { Item, BaseItem } from "@/types/item";
import { getDatabase } from "@/utils/db";

async function getAllItems() {
	const db = await getDatabase();
	const result = await db.select<Item[]>("SELECT * FROM products");
	return result;
}

async function getItemByBarcode(barcode: string): Promise<Item | null> {
	const db = await getDatabase();
	const result = await db.select<Item[]>("SELECT * FROM products WHERE barcode = $1", [barcode]);
	return result.length > 0 ? result[0] : null;
}

async function createItem(item: BaseItem): Promise<Item> {
	const db = await getDatabase();
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

async function updateItem(item: Item): Promise<Item> {
	const db = await getDatabase();
	const res = await db.execute("UPDATE products SET name = $1, price = $2 WHERE id = $3", [
		item.name,
		item.price,
		item.id,
	]);
	if (res.rowsAffected === 0) throw new Error("Failed to update item");
	return item;
}

export { getAllItems, getItemByBarcode, createItem, updateItem };
