import { invoke } from "@tauri-apps/api/core";
import { toast } from "vue-sonner";

interface ReceiptData {
	transaction_id: number;
	items: ReceiptItem[];
	total: number;
}

interface ReceiptItem {
	item_name: string;
	quantity: number;
	item_price_at_sale: number;
}

export async function printReceipt(receipt: ReceiptData) {
	if (!receipt || !receipt.items || receipt.items.length === 0) {
		toast.error("Cannot print receipt: Data is invalid or has no items.");
		return;
	}

	const payload: ReceiptData = {
		transaction_id: receipt.transaction_id,
		total: receipt.total,
		items: receipt.items,
	};

	try {
		await invoke("print_receipt", { data: payload });
		console.log("Receipt sent to printer successfully.");
	} catch (error) {
		console.error("Printer error:", error);
		let errorMessage = "Failed to do something exceptional";
		if (error instanceof Error) {
			errorMessage = error.message;
		}
		toast.error(`Printer Error: ${errorMessage}`);
	}
}
