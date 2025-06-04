<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Package, History, Settings } from "lucide-vue-next";
import CreateItemDialog from "@/components/actions/CreateItemDialog.vue";
import ClearCartAction from "./ClearCartAction.vue";
import type { Item } from "@/types/item";
import { useCart } from "@/composables/cart";
import { useBarcodeScanner } from "@/composables/barcodescanner";
import { useItemMutation } from "@/composables/mutations/item";

const { isScanning, addOpenItemToCart, addToCart, selectedItemId } = useCart();
const { showCreateItemDialog, barcodeForCreation, completeItemCreation } = useBarcodeScanner();
const { create } = useItemMutation();

const closeDialogAndResumeScanning = () => {
	completeItemCreation();
	isScanning.value = true;
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
		console.error("Error creating item in QuickActionsTab:", err);
	} finally {
		closeDialogAndResumeScanning();
	}
};
</script>

<template>
	<Card class="h-fit w-1/4">
		<CardHeader>
			<CardTitle class="text-2xl font-bold"> Quick Actions </CardTitle>
		</CardHeader>
		<CardContent class="space-y-3">
			<Button variant="outline" class="w-full h-12 text-left justify-start text-base">
				<Search class="w-5 h-5 mr-2" />
				Search Items
			</Button>
			<Button
				variant="outline"
				class="w-full h-12 text-left justify-start text-base"
				@click="addOpenItemToCart"
			>
				<Package class="w-5 h-5 mr-2" />
				Add Open Item
			</Button>
			<Button
				variant="outline"
				class="w-full h-12 text-left justify-start text-base"
				:disabled="selectedItemId === null"
			>
				<Settings class="w-5 h-5 mr-2" />
				Options
			</Button>
			<Button variant="outline" class="w-full h-12 text-left justify-start text-base">
				<History class="w-5 h-5 mr-2" />
				Transactions
			</Button>
			<ClearCartAction />
		</CardContent>
	</Card>

	<CreateItemDialog
		:open="showCreateItemDialog"
		:barcode="barcodeForCreation"
		@update:open="closeDialogAndResumeScanning"
		@create-item="handleDialogCreateItem"
	/>
</template>
