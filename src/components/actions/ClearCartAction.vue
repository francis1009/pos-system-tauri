<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogCancel,
	AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-vue-next";
import { useCart } from "@/composables/cart";

const { clearCart } = useCart();
</script>

<template>
	<AlertDialog>
		<AlertDialogTrigger as-child>
			<Button
				variant="destructive"
				class="w-full h-12 text-left justify-start hover:bg-red-700 text-base"
			>
				<Trash2 class="w-5 h-5 mr-2" />
				Clear Cart
			</Button>
		</AlertDialogTrigger>
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>Are you sure?</AlertDialogTitle>
				<AlertDialogDescription>This will clear the cart.</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel> Close </AlertDialogCancel>
				<AlertDialogAction as-child>
					<Button variant="destructive" @click="clearCart">
						<Trash2 class="w-5 h-5 mr-2" />
						Clear Cart
					</Button>
				</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>
</template>

<style scoped></style>
