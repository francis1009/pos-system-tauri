<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-vue-next";
import { useCart } from "@/composables/cart";

const { clearCart } = useCart();
</script>

<template>
	<Dialog
		><DialogTrigger as-child
			><Button
				variant="destructive"
				class="w-full h-12 text-left justify-start hover:bg-red-700 text-base"
			>
				<Trash2 class="w-5 h-5 mr-2" />
				Clear Cart
			</Button></DialogTrigger
		><DialogContent>
			<DialogHeader
				><DialogTitle>Are you sure?</DialogTitle
				><DialogDescription>This will clear the cart.</DialogDescription></DialogHeader
			><DialogFooter>
				<DialogClose as-child>
					<Button type="button" variant="secondary"> Close </Button>
				</DialogClose>
				<DialogClose as-child>
					<Button
						variant="destructive"
						@click="clearCart"
					>
						<Trash2 class="w-5 h-5 mr-2" />
						Clear Cart
					</Button>
				</DialogClose>
			</DialogFooter>
		</DialogContent>
	</Dialog>
</template>

<style scoped></style>
