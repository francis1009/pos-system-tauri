<script setup lang="ts">
import { ref } from "vue";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-vue-next";

defineProps<{
	open: boolean;
}>();
const emit = defineEmits<{
	(e: "update:open", value: boolean): void;
}>();

const itemSearch = ref("");

// const handleSearchItem = () => {
// 	emit("update:open", false);
// };
</script>

<template>
	<Dialog :open="open" @update:open="(value) => emit('update:open', value)">
		<DialogTrigger as-child>
			<Button
				variant="outline"
				class="w-full h-12 text-left justify-start text-base"
				@click="emit('update:open', true)"
			>
				<Search class="w-5 h-5 mr-2" />
				Search Items
			</Button>
		</DialogTrigger>

		<DialogContent class="sm:max-w-md">
			<DialogHeader>
				<DialogTitle>Search Items</DialogTitle>
				<Input
					id="item-search"
					v-model.number="itemSearch"
					type="text"
					class="w-80 text-base"
					placeholder="Search by name, barcode, or ID..."
				/>
			</DialogHeader>

			<DialogFooter></DialogFooter>
		</DialogContent>
	</Dialog>
</template>
