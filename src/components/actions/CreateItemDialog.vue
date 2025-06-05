<script setup lang="ts">
import { ref } from "vue";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const props = defineProps<{
	open: boolean;
	barcode: string | null;
}>();
const emit = defineEmits<{
	(e: "update:open", value: boolean): void;
	(e: "createItem", itemData: { barcode: string; name: string; price: number }): void;
}>();

const itemName = ref("");
const itemPrice = ref<number | undefined>(undefined);
const errorMessage = ref("");

const handleSaveItem = () => {
	errorMessage.value = "";
	if (!props.barcode) {
		errorMessage.value = "Error: Barcode is missing.";
		return;
	}
	if (!itemName.value.trim()) {
		errorMessage.value = "Please enter a name for the item.";
		return;
	}
	if (itemPrice.value === undefined || isNaN(itemPrice.value) || itemPrice.value < 0) {
		errorMessage.value = "Please enter a valid price (0 or greater).";
		return;
	}

	emit("createItem", {
		barcode: props.barcode,
		name: itemName.value.trim(),
		price: itemPrice.value * 100,
	});
	emit("update:open", false);

	itemName.value = "";
	itemPrice.value = undefined;
	errorMessage.value = "";
};
</script>

<template>
	<Dialog :open="open" @update:open="(value) => emit('update:open', value)">
		<DialogContent class="sm:max-w-md">
			<DialogHeader>
				<DialogTitle>Create New Item</DialogTitle>
				<DialogDescription>
					The item with barcode
					<strong v-if="barcode">{{ barcode }}</strong>
					<strong v-else>N/A</strong>
					was not found. Please provide its details.
				</DialogDescription>
			</DialogHeader>

			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="item-name" class="text-right">Name</Label>
					<Input
						id="item-name"
						type="text"
						v-model="itemName"
						class="col-span-3"
						placeholder="e.g., Special Drink"
					/>
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="item-price" class="text-right">Price</Label>
					<Input
						id="item-price"
						v-model.number="itemPrice"
						type="number"
						step="0.01"
						min="0"
						class="col-span-3"
						placeholder="e.g., 2.50"
					/>
				</div>
			</div>
			<div v-if="errorMessage" class="text-red-500 text-sm mb-4 text-center">
				{{ errorMessage }}
			</div>

			<DialogFooter>
				<Button variant="outline" @click="() => $emit('update:open', false)">Cancel</Button>
				<Button @click="handleSaveItem">Save & Add to Cart</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
</template>
