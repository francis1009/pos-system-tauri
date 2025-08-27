<script setup lang="ts">
import { Settings } from "lucide-vue-next";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { exit } from "@tauri-apps/plugin-process";

async function handleExit() {
	await exit();
}
</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger>
			<Settings class="mx-2" />
		</DropdownMenuTrigger>
		<DropdownMenuContent class="mr-1">
			<DropdownMenuItem variant="destructive" @click="handleExit" class="text-xl text-center font-bold justify-center">
				Exit
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
