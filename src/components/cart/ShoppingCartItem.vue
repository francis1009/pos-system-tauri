<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
	NumberField,
	NumberFieldContent,
	NumberFieldDecrement,
	NumberFieldIncrement,
	NumberFieldInput,
} from "@/components/ui/number-field";
import type { CartItem } from "@/types/item";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-vue-next";

const { item, formatter, isSelected } = defineProps<{
	item: CartItem;
	formatter: Intl.NumberFormat;
	isSelected: boolean;
}>();
defineEmits<{
	(e: "updateQuantity", itemId: number, quantity: number): void;
	(e: "selectItem", itemId: number): void;
}>();
</script>

<template>
	<Card
		:class="[
			'flex flex-row justify-between p-2 shadow-none',
			isSelected ? 'bg-blue-100 border-blue-500' : '',
		]"
		@click="() => $emit('selectItem', item.id)"
	>
		<CardHeader class="w-1/3 text-left">
			<CardTitle class="text-lg font-bold"> {{ item.name }} </CardTitle>
			<CardDescription class="text-sm text-gray-500">
				{{ formatter.format(item.price / 100) }} each
			</CardDescription>
		</CardHeader>
		<CardContent class="flex items-center gap-3">
			<NumberField :model-value="item.quantity">
				<NumberFieldContent>
					<NumberFieldDecrement
						@click.stop="() => $emit('updateQuantity', item.id, item.quantity - 1)"
					/>
					<NumberFieldInput />
					<NumberFieldIncrement
						@click.stop="() => $emit('updateQuantity', item.id, item.quantity + 1)"
					/>
				</NumberFieldContent>
			</NumberField>
			<Button variant="destructive" @click.stop="() => $emit('updateQuantity', item.id, 0)">
				<Trash2 />
			</Button>
			<p class="text-lg font-bold">
				{{ formatter.format((item.price / 100) * item.quantity) }}
			</p>
		</CardContent>
	</Card>
</template>

<style scoped></style>
