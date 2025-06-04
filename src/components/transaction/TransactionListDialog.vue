<script setup lang="ts">
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import TransactionList from "@/components/transaction/TransactionList.vue";
</script>

<template>
	<Dialog>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Transaction List</DialogTitle>
				<DialogDescription> View and manage your transactions. </DialogDescription>
			</DialogHeader>
			<TransactionList />
		</DialogContent>
	</Dialog>
</template>

<style scoped></style>
