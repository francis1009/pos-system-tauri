export interface Transaction extends BaseTransaction {
	id: number;
}

export interface BaseTransaction {
	transaction_timestamp: string;
	total_amount: number;
}

export interface TransactionItem {
	id: number;
	transaction_id: string;
	product_id: string | null;
	item_name: string;
	item_price_at_sale: number;
	quantity: number;
}
