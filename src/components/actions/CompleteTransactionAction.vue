<script setup lang="ts">
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogCancel,
	AlertDialogAction,
} from "@/components/ui/alert-dialog";

defineEmits<{
	"print-receipt": void;
	"cancel-print": void;
}>();
</script>
<template>
	<AlertDialog>
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>Do you want to print the receipt?</AlertDialogTitle>
				<AlertDialogDescription>
					The receipt will be printed with the transaction details. Please ensure the printer is
					connected and ready.
				</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel @click="$emit('cancel-print')">Cancel</AlertDialogCancel>
				<AlertDialogAction @click="$emit('print-receipt')">Print</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>
</template>

<style scoped></style>
