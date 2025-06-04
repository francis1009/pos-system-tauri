import { readonly, ref } from "vue";

const showCreateItemDialog = ref(false);
const showEditItemDialog = ref(false);
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

	const requestItemEditing = () => {
		showEditItemDialog.value = true;
	};

	const completeItemEditing = () => {
		showEditItemDialog.value = false;
	};

	return {
		showCreateItemDialog: readonly(showCreateItemDialog),
		showEditItemDialog: readonly(showEditItemDialog),
		barcodeForCreation: readonly(barcodeForCreation),
		requestItemCreation,
		completeItemCreation,
		requestItemEditing,
		completeItemEditing,
	};
}

export { useBarcodeScanner };
