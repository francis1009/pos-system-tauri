<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import TransactionList from "@/components/transaction/TransactionList.vue";
import { ArrowLeft } from "lucide-vue-next";
import { ref } from "vue";
import { useTransactionQuery } from "@/composables/queries/transaction";
import type { Transaction } from "@/types/transaction";
import { currencyFormatter } from "@/utils/formatter";

const { getWithItems } = useTransactionQuery();

const enabled = ref(false);
const selectedTransaction = ref<Transaction | null>(null);
const selectedTransactionId = ref<number>(-1);
const { data } = getWithItems(selectedTransactionId, enabled);

function onTransactionSelected(transaction: Transaction) {
	selectedTransaction.value = transaction;
	selectedTransactionId.value = transaction.id;
	enabled.value = true;
}
</script>
<template>
	<main class="flex min-h-screen gap-4 justify-center p-6 flex-col">
		<Button variant="outline" class="w-fit" @click="$router.back()">
			<ArrowLeft class="w-5 h-5" />
			Back
		</Button>
		<div class="flex grow gap-2">
			<Card class="w-2/5">
				<CardHeader>
					<CardTitle>Transactions</CardTitle>
					<CardDescription>List of all transactions</CardDescription>
				</CardHeader>
				<CardContent class="px-2">
					<ScrollArea class="h-130 w-full">
						<TransactionList @select-transaction="onTransactionSelected" />
					</ScrollArea>
				</CardContent>
			</Card>
			<Card class="w-3/5">
				<CardHeader>
					<CardTitle>Transaction Details</CardTitle>
					<CardDescription>Select a transaction to view details</CardDescription>
				</CardHeader>
				<CardContent>
					<p class="text-center text-gray-500" v-if="selectedTransaction === null">
						Please select a transaction from the list.
					</p>
					<div v-else>
						<p class="text-lg font-semibold">Transaction ID: {{ selectedTransaction.id }}</p>
						<p class="text-sm text-gray-500">
							Date: {{ selectedTransaction.transaction_timestamp }}
						</p>
						<p class="text-sm">
							Total Amount: {{ currencyFormatter.format(selectedTransaction.total_amount / 100) }}
						</p>
					</div>
					<hr />
					<div class="py-2">
						<div
							class="grid grid-cols-3 gap-2 items-center"
							v-for="item in data?.items"
							:key="item.id"
						>
							<p class="font-semibold">{{ item.item_name }}</p>
							<p class="text-sm text-center">X {{ item.quantity }}</p>
							<p class="text-sm">
								{{ currencyFormatter.format(item.item_price_at_sale / 100) }}
							</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	</main>
</template>

<style scoped></style>
