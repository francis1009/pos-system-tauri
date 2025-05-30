<script setup lang="ts">
import TheWelcome from "../components/TheWelcome.vue";
</script>

<template>
	<main>
		<Suspense>
			<TheWelcome />
		</Suspense>
	</main>
</template>
