<script setup lang="ts">
import { ref, watch } from "vue";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-vue-next";
import { useCart } from "@/composables/cart";
import type { CartItem } from "@/types/item";

const props = defineProps<{
	open: boolean;
}>();
const emit = defineEmits<{
	(e: "update:open", value: boolean): void;
	(e: "editItem", itemData: { cartItem: CartItem; isCustom: boolean }): void;
}>();

const { selectedItem } = useCart();

const editId = ref<number | null>(null);
const editName = ref("");
const editPrice = ref(0);
const editQuantity = ref(0);
const editBarcode = ref("");
const isCustom = ref(false);
const errorMessage = ref("");

watch(
	() => props.open,
	(isOpening) => {
		if (isOpening && selectedItem.value) {
			editId.value = selectedItem.value.id;
			editName.value = selectedItem.value.name;
			editPrice.value = selectedItem.value.price / 100;
			editQuantity.value = selectedItem.value.quantity;
			editBarcode.value = selectedItem.value.barcode;
			isCustom.value = selectedItem.value.name === "OPEN ITEM" || !selectedItem.value.barcode;
			errorMessage.value = "";
		}
	},
);

const handleEditItem = () => {
	if (!editId.value) {
		errorMessage.value = "Id not found.";
		return;
	}

	if (!editName.value.trim()) {
		errorMessage.value = "Please enter a name for the item.";
		return;
	}
	if (editPrice.value === null || isNaN(editPrice.value) || editPrice.value < 0) {
		errorMessage.value = "Please enter a valid price (0 or greater).";
		return;
	}

	const editItem: CartItem = {
		id: editId.value,
		name: editName.value.trim(),
		price: editPrice.value * 100,
		barcode: editBarcode.value,
		quantity: editQuantity.value,
	};

	emit("editItem", { cartItem: editItem, isCustom: isCustom.value });
	emit("update:open", false);
};
</script>

<template>
	<Dialog :open="open" @update:open="(value) => emit('update:open', value)">
		<DialogTrigger as-child>
			<Button
				variant="outline"
				class="w-full h-12 text-left justify-start text-base"
				:disabled="selectedItem === undefined"
				@click="if (selectedItem) emit('update:open', true);"
			>
				<Settings class="w-5 h-5 mr-2" />
				Options
			</Button>
		</DialogTrigger>

		<DialogContent v-if="editId !== null" class="sm:max-w-md">
			<DialogHeader>
				<DialogTitle>Update Existing Item</DialogTitle>
			</DialogHeader>

			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="item-name" class="text-right">Name</Label>
					<Input id="item-name" type="text" v-model="editName" class="col-span-3" />
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="item-price" class="text-right">Price</Label>
					<Input
						id="item-price"
						type="number"
						v-model.number="editPrice"
						step="0.01"
						min="0"
						class="col-span-3"
					/>
				</div>
			</div>
			<div v-if="errorMessage" class="text-red-500 text-sm mb-4 text-center">
				{{ errorMessage }}
			</div>

			<DialogFooter>
				<Button variant="outline" @click="() => $emit('update:open', false)">Cancel</Button>
				<Button @click="handleEditItem">Save Edits</Button>
			</DialogFooter>
		</DialogContent>

		<DialogContent v-else class="sm:max-w-md">
			<DialogHeader>
				<DialogTitle>Error</DialogTitle>
			</DialogHeader>
			<p class="py-4">No item was selected to edit. Please close and select an item.</p>
			<DialogFooter>
				<DialogClose as-child>
					<Button type="button" variant="secondary" @click="() => $emit('update:open', false)">
						Close
					</Button>
				</DialogClose>
			</DialogFooter>
		</DialogContent>
	</Dialog>
</template>
