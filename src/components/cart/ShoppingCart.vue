<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingCart } from "lucide-vue-next";
import ShoppingCartItem from "@/components/cart/ShoppingCartItem.vue";
import CompleteTransactionAction from "@/components/actions/CompleteTransactionAction.vue";
import { useCart } from "@/composables/cart";
import { useTransactionMutation } from "@/composables/mutations/transaction";
import type { BaseTransactionItem } from "@/types/transaction";
import { useTransactionItemMutation } from "@/composables/mutations/transactionItem";
import { currencyFormatter } from "@/utils/formatter";
import { computed, ref } from "vue";

const {
	total,
	cart,
	previousCart,
	selectedItemId,
	selectItem,
	updateItemQuantity,
	removeFromCart,
	clearCart,
	storePreviousCart,
} = useCart();
const { create } = useTransactionMutation();
const { batchCreate } = useTransactionItemMutation();

const formattedTotal = computed(() => currencyFormatter.format(total.value / 100));

const cartArray = computed(() => {
	return Array.from(cart.value.values());
});

const isPrintReceiptDialogOpen = ref(false);

function onQuantityChange(itemId: number, quantity: number) {
	if (quantity <= 0) {
		removeFromCart(itemId);
	} else {
		updateItemQuantity(itemId, quantity);
	}
}

function onItemSelect(itemId: number) {
	selectItem(itemId);
}

async function onTransactionComplete() {
	if (!cart.value.size) return; // TODO: sonnar no item in cart error
	const transactionId = await create(total.value);
	const cartItems = cartArray.value.map((item) => {
		const ret: BaseTransactionItem = {
			transaction_id: transactionId,
			product_id: item.name === "OPEN ITEM" || !item.barcode ? null : item.id,
			item_name: item.name,
			item_price_at_sale: item.price,
			quantity: item.quantity,
		};
		return ret;
	});
	await batchCreate(cartItems);

	storePreviousCart(transactionId);
	clearCart();
	isPrintReceiptDialogOpen.value = true;
}

function onPrintReceipt() {
	isPrintReceiptDialogOpen.value = false;
	// Logic to print the receipt
	console.log("Printing receipt...");
	// Use an invisible element to style the receipt

	console.log(previousCart.value);
}
</script>
<template>
	<CompleteTransactionAction
		v-model:open="isPrintReceiptDialogOpen"
		@print-receipt="onPrintReceipt"
	/>
	<div class="flex grow flex-col gap-4">
		<Card class="h-[calc(100vh-200px)]">
			<CardHeader class="flex flex-col gap-2">
				<div class="flex items-center justify-between w-full">
					<CardTitle class="text-2xl font-bold">
						<div class="flex items-center gap-2"><ShoppingCart /> Shopping Cart</div>
					</CardTitle>
					<p class="text-green-400 text-bold text-2xl">{{ formattedTotal }}</p>
				</div>
				<div class="flex gap-2 w-full">
					<Input type="text" placeholder="Scan barcode or type manually..." />
					<Button> Add </Button>
				</div>
			</CardHeader>
			<CardContent class="flex grow">
				<ScrollArea class="h-100 w-full">
					<div class="flex flex-col gap-1">
						<ShoppingCartItem
							v-for="item in cartArray"
							:key="item.id"
							:item="item"
							:formatter="currencyFormatter"
							:is-selected="selectedItemId === item.id"
							@update-quantity="onQuantityChange"
							@select-item="onItemSelect"
						/>
					</div>
				</ScrollArea>
			</CardContent>
		</Card>
		<div class="grid grid-cols-2 gap-4">
			<Button size="lg" @click="onTransactionComplete"> Complete Transaction </Button>
			<Button variant="outline" size="lg" @click="onPrintReceipt"> Print Receipt </Button>
		</div>
	</div>
</template>

<style scoped></style>
