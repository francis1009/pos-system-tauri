<script setup lang="ts">
import { RouterView } from "vue-router";
import { onKeyStroke } from "@vueuse/core";
import { useItemQuery } from "@/composables/queries/item";
import { useCart } from "@/composables/cart";
import { ref } from "vue";

const { getAllItems } = useItemQuery();
const { isScanning, addToCart } = useCart();
const { data: items, isLoading, error } = getAllItems();

const scannedArray = ref<string[]>([]);

onKeyStroke((e) => {
	e.preventDefault();
	if (!isScanning.value) return;
	if (!items.value) return;

	switch (e.key) {
		case "Enter": {
			const itemBarcode = scannedArray.value.join("");
			console.log("Scanned Barcode:", itemBarcode);
			const foundItem = items.value.find((item) => item.id === itemBarcode);
			console.log("Found Item:", foundItem);
			if (foundItem) addToCart(foundItem);
			scannedArray.value = [];
			break;
		}
		default:
			scannedArray.value.push(e.key);
	}
});
</script>

<template>
	<RouterView />
</template>

<style scoped></style>
