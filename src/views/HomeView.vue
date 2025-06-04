<script setup lang="ts">
import ShoppingCart from "@/components/cart/ShoppingCart.vue";
import QuickActionsTab from "@/components/actions/QuickActionsTab.vue";
import DateTimeDisplay from "@/components/DateTimeDisplay.vue";
import CreateItemDialog from "@/components/CreateItemDialog.vue";
import TransactionListDialog from "@/components/transaction/TransactionListDialog.vue";
import { onKeyStroke } from "@vueuse/core";
import { useItemQuery } from "@/composables/queries/item";
import { useItemMutation } from "@/composables/mutations/item";
import { useCart } from "@/composables/cart";
import { ref } from "vue";

const { getAll } = useItemQuery();
const { create } = useItemMutation();
const { isScanning, addToCart } = useCart();
const { data: items, isLoading, error } = getAll();

const scannedArray = ref<string[]>([]);
const showCreateItemDialog = ref(false);
const currentScannedBarcode = ref<string | null>(null);
const isTransactionListDialogOpen = ref(false);

onKeyStroke((e) => {
	if (!isScanning.value) return;
	if (isLoading.value || error.value || !items.value) return;
	e.preventDefault();

	switch (e.key) {
		case "Enter": {
			const itemBarcode = scannedArray.value.join("");
			console.log("Scanned Barcode:", itemBarcode);
			scannedArray.value = [];
			if (!itemBarcode) return;
			const foundItem = items.value.find((item) => item.barcode === itemBarcode);
			console.log("Found Item:", foundItem);
			if (foundItem) {
				addToCart(foundItem);
			} else {
				isScanning.value = false;
				currentScannedBarcode.value = itemBarcode;
				showCreateItemDialog.value = true;
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
			e.preventDefault();
			break;
		default:
			scannedArray.value.push(e.key);
	}
});

const updateDialogState = (value: boolean) => {
	isScanning.value = true;
	showCreateItemDialog.value = value;
	if (!value) {
		currentScannedBarcode.value = null;
	}
};

const handleDialogCreateItem = async (itemData: {
	barcode: string;
	name: string;
	price: number;
}) => {
	const newItem = await create(itemData);
	console.log(newItem);
	addToCart(newItem);
};
</script>

<template>
	<main class="flex min-h-screen gap-4 justify-center p-6 text-center">
		<ShoppingCart />
		<QuickActionsTab @open-transactions-dialog="isTransactionListDialogOpen = true" />
		<CreateItemDialog
			:open="showCreateItemDialog"
			:barcode="currentScannedBarcode"
			@update:open="updateDialogState"
			@create-item="handleDialogCreateItem"
		/>
		<TransactionListDialog
			:open="isTransactionListDialogOpen"
			@update:open="(value) => (isTransactionListDialogOpen = value)"
		/>
	</main>
	<footer>
		<DateTimeDisplay />
	</footer>
</template>
