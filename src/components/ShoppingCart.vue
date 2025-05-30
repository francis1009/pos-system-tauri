<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingCart } from "lucide-vue-next";
</script>
<template>
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
			<CardContent class="flex grow">
				<ScrollArea class="h-100">
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde commodi dolores veniam.
					Minus laudantium doloribus provident animi hic itaque rerum at beatae mollitia! Adipisci
					eligendi, dicta corrupti nam dolorum unde. Lorem ipsum, dolor sit amet consectetur
					adipisicing elit. Unde commodi dolores veniam. Minus laudantium doloribus provident animi
					hic itaque rerum at beatae mollitia! Adipisci eligendi, dicta corrupti nam dolorum unde.
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde commodi dolores veniam.
					Minus laudantium doloribus provident animi hic itaque rerum at beatae mollitia! Adipisci
					eligendi, dicta corrupti nam dolorum unde. Lorem ipsum, dolor sit amet consectetur
					adipisicing elit. Unde commodi dolores veniam. Minus laudantium doloribus provident animi
					hic itaque rerum at beatae mollitia! Adipisci eligendi, dicta corrupti nam dolorum unde.
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde commodi dolores veniam.
					Minus laudantium doloribus provident animi hic itaque rerum at beatae mollitia! Adipisci
					eligendi, dicta corrupti nam dolorum unde. Lorem ipsum, dolor sit amet consectetur
					adipisicing elit. Unde commodi dolores veniam. Minus laudantium doloribus provident animi
					hic itaque rerum at beatae mollitia! Adipisci eligendi, dicta corrupti nam dolorum unde.
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde commodi dolores veniam.
					Minus laudantium doloribus provident animi hic itaque rerum at beatae mollitia! Adipisci
					eligendi, dicta corrupti nam dolorum unde. Lorem ipsum, dolor sit amet consectetur
					adipisicing elit. Unde commodi dolores veniam. Minus laudantium doloribus provident animi
					hic itaque rerum at beatae mollitia! Adipisci eligendi, dicta corrupti nam dolorum unde.
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde commodi dolores veniam.
					Minus laudantium doloribus provident animi hic itaque rerum at beatae mollitia! Adipisci
					eligendi, dicta corrupti nam dolorum unde. Lorem ipsum, dolor sit amet consectetur
					adipisicing elit. Unde commodi dolores veniam. Minus laudantium doloribus provident animi
					hic itaque rerum at beatae mollitia! Adipisci eligendi, dicta corrupti nam dolorum unde.
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde commodi dolores veniam.
					Minus laudantium doloribus provident animi hic itaque rerum at beatae mollitia! Adipisci
					eligendi, dicta corrupti nam dolorum unde. Lorem ipsum, dolor sit amet consectetur
					adipisicing elit. Unde commodi dolores veniam. Minus laudantium doloribus provident animi
					hic itaque rerum at beatae mollitia! Adipisci eligendi, dicta corrupti nam dolorum unde.
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
