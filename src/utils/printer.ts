import { invoke } from "@tauri-apps/api/core";
import type { CartItem } from "@/types/item";
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

export async function printReceipt(
	previousCart: Map<number, CartItem>,
	prevTransactionId: number,
	prevTotal: number,
) {
	if (!previousCart || previousCart.size === 0) {
		console.error("Cannot print receipt: previous cart data is empty.");
		return;
	}

	const payload: ReceiptData = {
		transaction_id: prevTransactionId,
		total: prevTotal,
		items: Array.from(previousCart.values()).map((cartItem) => ({
			item_name: cartItem.name,
			quantity: cartItem.quantity,
			item_price_at_sale: cartItem.price,
		})),
	};

	try {
		await invoke("print_receipt", { data: payload });
		console.log("Receipt sent to printer successfully.");
	} catch (error) {
		console.error("Printer error:", error);
		toast.error(`Printer Error: ${error.message}`);
	}
}
