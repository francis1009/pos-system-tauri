import type { TransactionWithItem, Transaction, TransactionWithItems } from "@/types/transaction";
import { db } from "@/utils/db";

async function getAllTransactions() {
	const result = await db.select<Transaction[]>(
		`SELECT * FROM transactions
		WHERE transaction_timestamp > datetime('now', '-1 day')
		ORDER BY id DESC`,
	);
	return result;
}

async function getTransactionByIdWithItems(id: number): Promise<TransactionWithItems | null> {
	const result = await db.select<TransactionWithItem[]>(
		`SELECT * FROM transactions as t
		LEFT JOIN transaction_items as ti
		ON t.id = ti.transaction_id WHERE t.id = $1`,
		[id],
	);
	const ret: TransactionWithItems = {
		id: result[0]?.transaction_id ?? 0,
		transaction_timestamp: result[0]?.transaction_timestamp ?? "",
		total_amount: result[0]?.total_amount ?? 0,
		items: result.map((item) => ({
			id: item.id,
			transaction_id: item.transaction_id,
			product_id: item.product_id,
			item_name: item.item_name,
			item_price_at_sale: item.item_price_at_sale,
			quantity: item.quantity,
		})),
	};
	return ret;
}

async function createTransaction(transactionCost: number): Promise<number> {
	const result = await db.execute("INSERT INTO transactions (total_amount) VALUES ($1)", [
		transactionCost,
	]);
	if (!result.lastInsertId) throw new Error("Failed to create transaction");
	else return result.lastInsertId;
}

export { getAllTransactions, getTransactionByIdWithItems, createTransaction };
