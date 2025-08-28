import type { TransactionItem, BaseTransactionItem } from "@/types/transaction";
import { getDatabase } from "@/utils/db";

async function getAllTransactionItems() {
	const db = await getDatabase();
	const result = await db.select<TransactionItem[]>("SELECT * FROM transaction_items");
	return result;
}

async function createTransactionItem(item: BaseTransactionItem) {
	const db = await getDatabase();
	const result = await db.execute(
		"INSERT INTO transaction_items (transaction_id, product_id, item_name, item_price_at_sale, quantity) VALUES ($1, $2, $3, $4, $5)",
		[item.transaction_id, item.product_id, item.item_name, item.item_price_at_sale, item.quantity],
	);
	if (!result.lastInsertId) throw new Error("Failed to create transaction item");
	else return result.lastInsertId;
}

export { getAllTransactionItems, createTransactionItem };
