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

const { item, formatter } = defineProps<{ item: CartItem; formatter: Intl.NumberFormat }>();
defineEmits<{
	(updateQuantity: { itemId: string; quantity: number }): void;
}>();
</script>

<template>
	<Card class="flex flex-row justify-between p-2 shadow-none">
		<CardHeader class="w-1/3 text-left">
			<CardTitle class="text-lg font-bold"> {{ item.name }} </CardTitle>
			<CardDescription class="text-sm text-gray-500">
				{{ formatter.format(item.price) }} each
			</CardDescription>
		</CardHeader>
		<CardContent class="flex items-center gap-3">
			<NumberField :model-value="item.quantity">
				<NumberFieldContent>
					<NumberFieldDecrement
						@click="() => $emit('updateQuantity', item.id, item.quantity - 1)"
					/>
					<NumberFieldInput />
					<NumberFieldIncrement
						@click="() => $emit('updateQuantity', item.id, item.quantity + 1)"
					/>
				</NumberFieldContent>
			</NumberField>
			<p class="text-lg font-bold">
				{{ formatter.format(item.price * item.quantity) }}
			</p>
		</CardContent>
	</Card>
</template>

<style scoped></style>
