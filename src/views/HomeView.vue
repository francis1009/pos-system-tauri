<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Package, History, Trash2, ShoppingCart } from "lucide-vue-next";
</script>

<template>
	<main class="flex min-h-screen gap-4 justify-center p-6 text-center">
		<div class="w-4/6 flex flex-col gap-4">
			<Card class="h-[calc(100vh-200px)]">
				<CardHeader class="flex flex-col gap-2">
					<div class="flex items-center justify-between w-full">
						<CardTitle class="text-2xl font-bold">
							<div class="flex items-center gap-2"><ShoppingCart /> Shopping Cart</div>
						</CardTitle>
						<p class="text-green-400 text-bold text-2xl">$0.00</p>
					</div>
					<div class="flex gap-2 w-full">
						<Input type="text" placeholder="Scan barcode or type manually..." />
						<Button> Add </Button>
					</div>
				</CardHeader>
				<CardContent>
					<p class="text-lg text-muted-foreground">
						This is a simple shopping cart application built with Vue 3 and TypeScript. It allows
						you to add items to your cart, view the cart, and proceed to checkout.
					</p>
				</CardContent>
			</Card>
			<div class="grid grid-cols-2 gap-4">
				<Button size="lg"> Complete Transaction </Button>
				<Button variant="outline" size="lg"> Print Receipt </Button>
			</div>
		</div>
		<Card class="h-fit">
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
