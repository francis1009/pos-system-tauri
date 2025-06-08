import { readonly, ref } from "vue";

const showSearchItemDialog = ref(false);
const showCreateItemDialog = ref(false);
const showEditItemDialog = ref(false);
const barcodeForCreation = ref<string | null>(null);
const isScanning = ref(true);

function useBarcodeScanner() {
	const requestItemSearch = () => {
		isScanning.value = false;
		showSearchItemDialog.value = true;
	};

	const completeItemSearch = () => {
		isScanning.value = true;
		showSearchItemDialog.value = false;
	};

	const requestItemCreation = (barcode: string) => {
		isScanning.value = false;
		barcodeForCreation.value = barcode;
		showCreateItemDialog.value = true;
	};

	const completeItemCreation = () => {
		isScanning.value = true;
		showCreateItemDialog.value = false;
		barcodeForCreation.value = null;
	};

	const requestItemEditing = () => {
		isScanning.value = false;
		showEditItemDialog.value = true;
	};

	const completeItemEditing = () => {
		isScanning.value = true;
		showEditItemDialog.value = false;
	};

	return {
		isScanning: readonly(isScanning),
		showSearchItemDialog: readonly(showSearchItemDialog),
		showCreateItemDialog: readonly(showCreateItemDialog),
		showEditItemDialog: readonly(showEditItemDialog),
		barcodeForCreation: readonly(barcodeForCreation),
		requestItemSearch,
		completeItemSearch,
		requestItemCreation,
		completeItemCreation,
		requestItemEditing,
		completeItemEditing,
	};
}

export { useBarcodeScanner };
