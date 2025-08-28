<script setup lang="ts">
import { ref } from "vue";
import ShoppingCart from "@/components/cart/ShoppingCart.vue";
import SearchDropdown from "@/components/search/SearchDropdown.vue";
import QuickActionsTab from "@/components/actions/QuickActionsTab.vue";
import DateTimeDisplay from "@/components/DateTimeDisplay.vue";
import TransactionListDialog from "@/components/transaction/TransactionListDialog.vue";
import { onKeyStroke } from "@vueuse/core";
import { useItemQuery } from "@/composables/queries/item";
import { useCart } from "@/composables/cart";
import { useBarcodeScanner } from "@/composables/barcodescanner";

const { getAll } = useItemQuery();
const { addToCart } = useCart();
const { isScanning, requestItemCreation } = useBarcodeScanner();
const { data: items, isLoading, error } = getAll();

const scannedArray = ref<string[]>([]);
const isTransactionListDialogOpen = ref(false);

onKeyStroke((e) => {
	if (!isScanning.value) return;
	if (isLoading.value || error.value || !items.value) return;
	e.preventDefault();

	switch (e.key) {
		case "Enter": {
			const itemBarcode = scannedArray.value.join("");
			scannedArray.value = [];
			if (!itemBarcode) return;
			const foundItem = items.value.find((item) => item.barcode === itemBarcode);
			if (foundItem) {
				addToCart(foundItem);
			} else {
				requestItemCreation(itemBarcode);
			}
			break;
		}
		case "Shift":
		case "Control":
		case "Alt":
		case "Meta":
		case "CapsLock":
		case "Tab":
		case "Escape":
		case "F1":
		case "F2":
		case "F3":
		case "F4":
		case "F5":
		case "F6":
		case "F7":
		case "F8":
		case "F9":
		case "F10":
		case "F11":
		case "F12":
		case "ArrowUp":
		case "ArrowDown":
		case "ArrowLeft":
		case "ArrowRight":
		case "Home":
		case "End":
		case "PageUp":
		case "PageDown":
		case "Insert":
		case "Delete":
		case "Backspace":
		case "Super":
			e.preventDefault();
			break;
		default:
			scannedArray.value.push(e.key);
	}
});
</script>

<template>
	<main class="flex min-h-screen items-start gap-4 justify-center p-6">
		<div class="flex-grow">
			<ShoppingCart />
		</div>
		<div class="w-60 space-y-2">
			<div class="flex justify-end">
				<SearchDropdown />
			</div>
			<QuickActionsTab @open-transactions-dialog="isTransactionListDialogOpen = true" />
		</div>
		<TransactionListDialog
			:open="isTransactionListDialogOpen"
			@update:open="(value: boolean) => (isTransactionListDialogOpen = value)"
		/>
	</main>
	<footer>
		<DateTimeDisplay />
	</footer>
</template>
