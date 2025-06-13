<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, History } from "lucide-vue-next";
import SearchItemsAction from "./SearchItemsAction.vue";
import OptionsAction from "./OptionsAction.vue";
import CreateItemDialog from "@/components/actions/CreateItemDialog.vue";
import ClearCartAction from "./ClearCartAction.vue";
import type { CartItem, Item } from "@/types/item";
import { useCart } from "@/composables/cart";
import { useBarcodeScanner } from "@/composables/barcodescanner";
import { useItemMutation } from "@/composables/mutations/item";
import { toast } from "vue-sonner";

const { addOpenItemToCart, addToCart, selectedItemId, editItemInCart } = useCart();
const {
	showSearchItemDialog,
	showCreateItemDialog,
	showEditItemDialog,
	barcodeForCreation,
	requestItemSearch,
	completeItemSearch,
	requestItemEditing,
	completeItemCreation,
	completeItemEditing,
} = useBarcodeScanner();
const { create, update } = useItemMutation();

const handleSearchItemsDialog = (isOpen: boolean) => {
	if (isOpen) {
		requestItemSearch();
	} else {
		completeItemSearch();
	}
};

const closeCreateItemDialog = () => {
	completeItemCreation();
};

const handleOptionsDialog = (isOpen: boolean) => {
	if (isOpen) {
		if (selectedItemId.value !== null) {
			requestItemEditing();
		}
	} else {
		completeItemEditing();
	}
};

const handleDialogCreateItem = async (itemData: {
	barcode: string;
	name: string;
	price: number;
}) => {
	try {
		const newItem: Item = await create(itemData);
		if (newItem) addToCart(newItem);
	} catch (err) {
		const errorMsg = err instanceof Error ? err.message : (err as string);
		toast.error("Failed to create item. Please try again.", { description: errorMsg });
	} finally {
		closeCreateItemDialog();
	}
};

const handleDialogEditItem = async (itemData: { cartItem: CartItem; isCustom: boolean }) => {
	try {
		if (!itemData.isCustom) {
			await update(itemData.cartItem);
		}
		editItemInCart(itemData.cartItem);
	} catch (err) {
		const errorMsg = err instanceof Error ? err.message : (err as string);
		toast.error("Failed to edit item. Please try again.", { description: errorMsg });
	} finally {
		handleOptionsDialog(false);
	}
};
defineEmits<{
	openTransactionsDialog: [];
}>();
</script>

<template>
	<Card class="h-fit w-1/4">
		<CardHeader>
			<CardTitle class="text-2xl font-bold"> Quick Actions </CardTitle>
		</CardHeader>
		<CardContent class="space-y-3">
			<SearchItemsAction :open="showSearchItemDialog" @update:open="handleSearchItemsDialog" />
			<Button
				variant="outline"
				class="w-full h-12 text-left justify-start text-base"
				@click="addOpenItemToCart"
			>
				<Package class="w-5 h-5 mr-2" />
				Add Open Item
			</Button>
			<OptionsAction
				:open="showEditItemDialog"
				@update:open="handleOptionsDialog"
				@edit-item="handleDialogEditItem"
			/>
			<Button
				variant="outline"
				class="w-full h-12 text-left justify-start text-base"
				@click="$router.push('/transaction')"
			>
				<History class="w-5 h-5 mr-2" />
				Transactions
			</Button>
			<ClearCartAction />
		</CardContent>
	</Card>

	<CreateItemDialog
		:open="showCreateItemDialog"
		:barcode="barcodeForCreation"
		@update:open="closeCreateItemDialog"
		@create-item="handleDialogCreateItem"
	/>
</template>
