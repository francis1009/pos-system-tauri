<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Package, History, Trash2 } from "lucide-vue-next";
import ShoppingCart from "@/components/cart/ShoppingCart.vue";
</script>

<template>
	<main class="flex min-h-screen gap-4 justify-center p-6 text-center">
		<ShoppingCart />
		<Card class="h-fit w-1/4">
			<CardHeader>
				<CardTitle class="text-2xl font-bold"> Quick Actions </CardTitle>
			</CardHeader>
			<CardContent class="space-y-3">
				<Button variant="outline" class="w-full h-12 text-left justify-start text-base">
					<Search className="w-5 h-5 mr-2" />
					Search Items
				</Button>
				<Button variant="outline" class="w-full h-12 text-left justify-start text-base">
					<Package className="w-5 h-5 mr-2" />
					Add Open Item
				</Button>
				<Button variant="outline" class="w-full h-12 text-left justify-start text-base">
					<History className="w-5 h-5 mr-2" />
					Transactions
				</Button>
				<Button
					variant="destructive"
					class="w-full h-12 text-left justify-start hover:bg-red-700 text-base"
				>
					<Trash2 className="w-5 h-5 mr-2" />
					Clear Cart
				</Button>
			</CardContent>
		</Card>
	</main>
</template>
