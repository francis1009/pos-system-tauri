<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-vue-next";
import { useTransactionQuery } from "@/composables/queries/transaction";
import { currencyFormatter, formatSqliteDateToSGT } from "@/utils/formatter";
import { useTransactionService } from "@/composables/service/transaction";

const { getTransactionByIdWithItems } = useTransactionService();
const { getAll } = useTransactionQuery();
const { data: transactions } = getAll();

async function onPrintTransaction(transactionId: number) {
	const transactionWithItems = await getTransactionByIdWithItems(transactionId);
	if (transactionWithItems) {
		console.log("Transaction Details:", transactionWithItems);
	} else {
		console.error("Transaction not found or failed to retrieve.");
	}
}
</script>

<template>
	<div class="flex flex-col gap-2" v-if="transactions">
		<Card
			class="flex flex-row justify-between items-center p-2 shadow-none"
			v-for="transaction in transactions"
			:key="transaction.id"
		>
			<CardHeader class="w-1/3">
				<CardTitle> {{ transaction.id }} </CardTitle>
				<CardDescription>
					{{ formatSqliteDateToSGT(transaction.transaction_timestamp) }}
				</CardDescription>
			</CardHeader>
			<CardContent class="w-1/3">
				<div class="flex items-center gap-2">
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
