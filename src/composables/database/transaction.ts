import type { Transaction } from "@/types/transaction";
import { db } from "@/utils/db";

async function getAllTransactions() {
	const result = await db.select<Transaction[]>("SELECT * FROM transactions");
	return result;
}

async function createTransaction(transactionCost: number): Promise<number> {
	const result = await db.execute("INSERT INTO transactions (total_amount) VALUES ($1)", [
		transactionCost,
	]);
	if (!result.lastInsertId) throw new Error("Failed to create transaction");
	else return result.lastInsertId;
}

export { getAllTransactions, createTransaction };
