import { readonly, ref } from "vue";

const showCreateItemDialog = ref(false);
const barcodeForCreation = ref<string | null>(null);

function useBarcodeScanner() {
	const requestItemCreation = (barcode: string) => {
		barcodeForCreation.value = barcode;
		showCreateItemDialog.value = true;
	};

	const completeItemCreation = () => {
		showCreateItemDialog.value = false;
		barcodeForCreation.value = null;
	};

	return {
		showCreateItemDialog: readonly(showCreateItemDialog),
		barcodeForCreation: readonly(barcodeForCreation),
		requestItemCreation,
		completeItemCreation,
	};
}

export { useBarcodeScanner };
