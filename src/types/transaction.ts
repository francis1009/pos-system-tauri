export interface BaseTransaction {
	transaction_timestamp: string;
	total_amount: number;
}

export interface Transaction extends BaseTransaction {
	id: number;
}

export interface BaseTransactionItem {
	transaction_id: number;
	product_id: number | null;
	item_name: string;
	item_price_at_sale: number;
	quantity: number;
}

export interface TransactionItem extends BaseTransactionItem {
	id: number;
}
