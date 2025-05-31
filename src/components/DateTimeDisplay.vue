<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const currentTime = ref("");
let timerId: number | undefined = undefined;

const updateTime = () => {
	const now = new Date();
	const dateOptions = {
		year: "numeric",
		month: "numeric",
		day: "numeric",
	};
	const timeOptions = {
		hour: "numeric",
		minute: "2-digit",
		second: "2-digit",
		hour12: true,
	};
	currentTime.value =
		now.toLocaleString("en-SG", dateOptions) + " " + now.toLocaleString("en-SG", timeOptions);
};

onMounted(() => {
	updateTime();
	timerId = window.setInterval(updateTime, 1000);
});

onUnmounted(() => {
	if (timerId) {
		clearInterval(timerId);
	}
});
</script>

<template>
	<div
		class="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-lg"
	>
		<div class="text-sm font-medium">
			{{ currentTime }}
		</div>
	</div>
</template>
