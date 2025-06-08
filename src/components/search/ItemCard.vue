<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";

const { item, formatter } = defineProps<{
	item: Item;
	formatter: Intl.NumberFormat;
}>();
defineEmits<{
	(e: "selectItem", item: Item): void;
}>();
</script>

<template>
	<Card
		class="py-5 align-center w-full cursor-pointer hover:bg-gray-100 transition-colors"
		@click="() => $emit('selectItem', item)"
	>
		<CardContent class="px-4 h-full flex flex-col">
			<div class="flex-1 min-w-0">
				<p class="text-lg font-bold text-base truncate">{{ item.name }}</p>
				<p class="text-sm text-gray-600">{{ formatter.format(item.price / 100) }}</p>
				<p class="text-xs text-gray-400 truncate">{{ item.barcode }}</p>
			</div>
		</CardContent>
	</Card>
</template>
