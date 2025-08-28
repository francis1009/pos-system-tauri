<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
import type { Item } from "@/types/item";

const { item, formatter } = defineProps<{
	item: Item;
	formatter: Intl.NumberFormat;
}>();
defineEmits<{
	selectItem: [item: Item];
}>();
</script>

<template>
	<Card
		class="h-36 cursor-pointer hover:bg-gray-100 transition-colors flex flex-col"
		@click="() => $emit('selectItem', item)"
	>
		<CardContent class="h-full flex flex-col min-h-0">
			<div class="flex-1 min-w-0">
				<p class="text-lg font-bold line-clamp-2">
					{{ item.name }}
				</p>
			</div>

			<div>
				<p class="text-sm text-gray-600">{{ formatter.format(item.price / 100) }}</p>
				<p class="text-xs text-gray-400 truncate">{{ item.barcode }}</p>
			</div>
		</CardContent>
	</Card>
</template>
