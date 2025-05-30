<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingCart } from "lucide-vue-next";
import { useCart } from "@/composables/cart";
import { computed } from "vue";

const { total, cart } = useCart();

const formatter = new Intl.NumberFormat("en-SG", {
	style: "currency",
	currency: "SGD",
	minimumFractionDigits: 2,
});

const formattedTotal = computed(() => formatter.format(total.value));

const cartArray = computed(() => {
	return Array.from(cart.value.values());
});
</script>
<template>
	<div class="flex grow flex-col gap-4">
		<Card class="h-[calc(100vh-200px)]">
			<CardHeader class="flex flex-col gap-2">
				<div class="flex items-center justify-between w-full">
					<CardTitle class="text-2xl font-bold">
						<div class="flex items-center gap-2"><ShoppingCart /> Shopping Cart</div>
					</CardTitle>
					<p class="text-green-400 text-bold text-2xl">{{ formattedTotal }}</p>
				</div>
				<div class="flex gap-2 w-full">
					<Input type="text" placeholder="Scan barcode or type manually..." />
					<Button> Add </Button>
				</div>
			</CardHeader>
			<CardContent class="flex grow">
				<ScrollArea class="h-100 w-full">
					<Card class="flex flex-row justify-between" v-for="item in cartArray" :key="item.id">
						<CardHeader class="w-1/3 text-left">
							<CardTitle class="text-lg font-bold"> {{ item.name }} </CardTitle>
							<CardDescription class="text-sm text-gray-500">
								{{ formatter.format(item.price) }} each
							</CardDescription>
						</CardHeader>
						<CardContent> sadada </CardContent>
					</Card>
				</ScrollArea>
			</CardContent>
		</Card>
		<div class="grid grid-cols-2 gap-4">
			<Button size="lg"> Complete Transaction </Button>
			<Button variant="outline" size="lg"> Print Receipt </Button>
		</div>
	</div>
</template>

<style scoped></style>
