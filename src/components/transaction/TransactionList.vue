<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useTransactionQuery } from "@/composables/queries/transaction";
import { currencyFormatter } from "@/utils/formatter";

// const { transactionId } = defineProps<{
// 	transactionId: number;
// }>();

const { getWithItems, getAll } = useTransactionQuery();
const { data: transactionData, isLoading, error } = getWithItems(0);
const { data: transactions, isLoading: isTransactionsLoading, error: transactionsError } = getAll();
</script>

<template>
	<div class="flex flex-col gap-2" v-if="transactions">
		<Card
			class="flex flex-row justify-between p-2 shadow-none"
			v-for="transaction in transactions"
			:key="transaction.id"
		>
			<CardHeader>
				<CardTitle> {{ transaction.id }} </CardTitle>
				<CardDescription> {{ transaction.transaction_timestamp }} </CardDescription>
			</CardHeader>
			<CardContent> {{ currencyFormatter.format(transaction.total_amount / 100) }} </CardContent>
		</Card>
	</div>
</template>

<style scoped></style>
