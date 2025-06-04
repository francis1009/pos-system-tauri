import type { TransactionWithItem, Transaction, TransactionWithItems } from "@/types/transaction";
import { db } from "@/utils/db";

async function getAllTransactions() {
	const result = await db.select<Transaction[]>(
		`SELECT * FROM transactions 
		ORDER BY id DESC`,
	);
	return result;
}

async function getTransactionByIdWithItems(id: number): Promise<TransactionWithItems | null> {
	const result = await db.select<TransactionWithItem[]>(
		`SELECT * FROM transactions as t
		INNER JOIN transaction_items as ti
		ON t.id = ti.transaction_id WHERE t.id = $1`,
		[id],
	);
	console.log(result);
	return null;
}

async function createTransaction(transactionCost: number): Promise<number> {
	const result = await db.execute("INSERT INTO transactions (total_amount) VALUES ($1)", [
		transactionCost,
	]);
	if (!result.lastInsertId) throw new Error("Failed to create transaction");
	else return result.lastInsertId;
}

export { getAllTransactions, getTransactionByIdWithItems, createTransaction };
