<script setup lang="ts">
import { ref } from "vue";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ItemCard from "@/components/search/ItemCard.vue";
import { Search } from "lucide-vue-next";
import { useItemQuery } from "@/composables/queries/item";
import { currencyFormatter } from "@/utils/formatter";

defineProps<{
	open: boolean;
}>();
const emit = defineEmits<{
	(e: "update:open", value: boolean): void;
}>();

const { getAll } = useItemQuery();
const { data: items, isLoading, error } = getAll();

const filter = ref("");

const onItemSelect = () => {
	emit("update:open", false);
};
</script>

<template>
	<Dialog :open="open" @update:open="(value) => emit('update:open', value)">
		<DialogTrigger as-child>
			<Button
				variant="outline"
				class="w-full h-12 text-left justify-start text-base"
				@click="emit('update:open', true)"
			>
				<Search class="w-5 h-5 mr-2" />
				Search Items
			</Button>
		</DialogTrigger>

		<DialogContent class="sm:max-w-3xl max-h-[90vh]">
			<DialogHeader>
				<DialogTitle class="mb-3">Search Items</DialogTitle>
				<Input
					id="item-search"
					v-model="filter"
					type="text"
					class="w-80 text-base"
					placeholder="Search by name, or barcode..."
				/>
			</DialogHeader>

			<div v-if="isLoading"><p>Loading Items</p></div>
			<div v-else-if="error">
				<p class="text-red-500">{{ error }}</p>
			</div>
			<div else class="grid grid-cols-3 gap-4">
				<ItemCard
					v-for="item in items"
					:key="item.id"
					:item="item"
					:formatter="currencyFormatter"
					@select-item="onItemSelect"
				/>
			</div>

			<DialogFooter></DialogFooter>
		</DialogContent>
	</Dialog>
</template>
