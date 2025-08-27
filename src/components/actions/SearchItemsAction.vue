<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useDebounce } from "@vueuse/core";
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
import ItemCard from "@/components/search/SearchDropdown.vue";
import { Package, Search, ChevronLeft, ChevronRight } from "lucide-vue-next";
import { useItemQuery } from "@/composables/queries/item";
import { currencyFormatter } from "@/utils/formatter";
import type { Item } from "@/types/item";
import { useCart } from "@/composables/cart";
import uFuzzy from "@leeoniya/ufuzzy";

defineProps<{
	open: boolean;
}>();
const emit = defineEmits<{
	"update:open": [value: boolean];
}>();

const { addToCart } = useCart();

const { getAll } = useItemQuery();
const { data: items, isLoading, error } = getAll();

const filterInput = ref("");
const debouncedFilter = useDebounce(filterInput, 200);
const uf = new uFuzzy({});

const searchItems = computed(() => {
	if (!items.value) return [];
	return items.value.map((item) => {
		return item.name.toLocaleLowerCase() + item.barcode.toLowerCase();
	});
});

const filteredItems = computed<Item[]>(() => {
	const itemsToFilter = searchItems.value ?? [];
	const filterText = debouncedFilter.value.toLocaleLowerCase().trim();
	if (filterText.length === 0) {
		return items.value ?? [];
	}
	const filteredItems = uf.filter(itemsToFilter, filterText);
	if (!filteredItems || filteredItems.length === 0) {
		return [];
	}
	return filteredItems.map((index) => items.value![index]);
});

const currentPage = ref(1);
const ITEMS_PER_PAGE = 9;
const totalPages = computed(() => Math.ceil(filteredItems.value.length / ITEMS_PER_PAGE));

const paginatedItems = computed<Item[]>(() => {
	const start = (currentPage.value - 1) * ITEMS_PER_PAGE;
	const end = start + ITEMS_PER_PAGE;
	return filteredItems.value.slice(start, end);
});

const onItemSelect = (item: Item) => {
	addToCart(item);
	emit("update:open", false);
};

const goToNextPage = () => {
	if (currentPage.value < totalPages.value) {
		currentPage.value++;
	}
};

const goToPreviousPage = () => {
	if (currentPage.value > 1) {
		currentPage.value--;
	}
};

watch(debouncedFilter, () => {
	currentPage.value = 1;
});
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
					v-model="filterInput"
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
					v-for="item in paginatedItems"
					:key="item.id"
					:item="item"
					:formatter="currencyFormatter"
					@select-item="onItemSelect"
				/>

				<div
					v-if="paginatedItems.length === 0"
					class="flex items-center justify-center h-64 text-gray-500 col-span-3"
				>
					<div class="text-center">
						<Package class="w-12 h-12 mx-auto mb-4 opacity-50" />
						<p class="text-lg mb-2">Not found</p>
						<p class="text-sm">No products match "{{ filterInput }}"</p>
					</div>
				</div>
			</div>

			<DialogFooter class="flex justify-between items-center w-full">
				<p class="text-sm text-gray-500">
					Showing {{ paginatedItems.length }} of {{ filteredItems.length }} items
				</p>
				<div class="flex items-center gap-2">
					<Button
						variant="outline"
						size="icon"
						@click="goToPreviousPage"
						:disabled="currentPage === 1"
					>
						<ChevronLeft class="h-4 w-4" />
					</Button>
					<span class="text-sm"> Page {{ currentPage }} of {{ totalPages }} </span>
					<Button
						variant="outline"
						size="icon"
						@click="goToNextPage"
						:disabled="currentPage === totalPages || totalPages === 0"
					>
						<ChevronRight class="h-4 w-4" />
					</Button>
				</div>
			</DialogFooter>
		</DialogContent>
	</Dialog>
</template>
