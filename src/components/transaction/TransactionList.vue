<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer, Eye } from "lucide-vue-next";
import { useTransactionQuery } from "@/composables/queries/transaction";
import { currencyFormatter, formatSqliteDateToSGT } from "@/utils/formatter";
import { useTransactionService } from "@/composables/service/transaction";
import type { Transaction } from "@/types/transaction";
import { toast } from "vue-sonner";

const { getTransactionByIdWithItems } = useTransactionService();
const { getAll } = useTransactionQuery();
const { data: transactions } = getAll();

defineEmits<{
	selectTransaction: [transaction: Transaction];
}>();

async function onPrintTransaction(transactionId: number) {
	const transactionWithItems = await getTransactionByIdWithItems(transactionId);
	if (transactionWithItems) {
		console.log("Transaction Details:", transactionWithItems);
	} else {
		toast.error("Failed to retrieve transaction details.");
	}
}
</script>

<template>
	<div class="flex flex-col gap-1" v-if="transactions">
		<Card
			class="flex flex-row justify-between items-center shadow-none py-2"
			v-for="transaction in transactions"
			:key="transaction.id"
		>
			<CardHeader class="w-1/3">
				<CardTitle> {{ transaction.id }} </CardTitle>
				<CardDescription>
					<p class="text-xs">{{ formatSqliteDateToSGT(transaction.transaction_timestamp) }}</p>
				</CardDescription>
			</CardHeader>
			<CardContent class="w-3/5">
				<div class="flex items-center gap-2">
					<Button variant="outline" @click="$emit('selectTransaction', transaction)">
						<Eye class="w-5 h-5" />
					</Button>
					<Button variant="outline" @click="onPrintTransaction(transaction.id)">
						<Printer class="w-5 h-5" />
					</Button>
					<p class="text-sm">
						{{ currencyFormatter.format(transaction.total_amount / 100) }}
					</p>
				</div>
			</CardContent>
		</Card>
	</div>
</template>

<style scoped></style>
