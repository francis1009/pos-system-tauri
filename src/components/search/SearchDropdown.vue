<script setup lang="ts">
import { Settings } from "lucide-vue-next";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
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
			<DropdownMenuItem>Import</DropdownMenuItem>
			<DropdownMenuItem>Export</DropdownMenuItem>
			<DropdownMenuSeparator />
			<DropdownMenuItem variant="destructive" @click="handleExit">Exit</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
