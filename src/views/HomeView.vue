<script setup lang="ts">
import ShoppingCart from "@/components/cart/ShoppingCart.vue";
import QuickActionsTab from "@/components/actions/QuickActionsTab.vue";
import DateTimeDisplay from "@/components/DateTimeDisplay.vue";
</script>

<template>
	<main class="flex min-h-screen gap-4 justify-center p-6 text-center">
		<ShoppingCart />
		<QuickActionsTab />
	</main>
	<footer>
		<DateTimeDisplay />
	</footer>
</template>
