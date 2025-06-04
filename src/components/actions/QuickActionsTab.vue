<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Package, History, Settings } from "lucide-vue-next";
import ClearCartAction from "./ClearCartAction.vue";
import { useCart } from "@/composables/cart";

const { addOpenItemToCart, selectedItemId } = useCart();
defineEmits<{
	openTransactionsDialog: [];
}>();
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
			<Button
				variant="outline"
				class="w-full h-12 text-left justify-start text-base"
				@click="$emit('openTransactionsDialog')"
			>
				<History class="w-5 h-5 mr-2" />
				Transactions
			</Button>
			<ClearCartAction />
		</CardContent>
	</Card>
</template>
