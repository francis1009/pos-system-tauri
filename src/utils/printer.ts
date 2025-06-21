import { invoke } from "@tauri-apps/api/core";

let isPrinterConnected = false;

// Print ESCPOS from Tauri
export async function print_test() {
	if (!isPrinterConnected) {
		alert("Printer is not connected");
		return;
	}

	try {
		await invoke("print_test", {});
		console.log("Print success");
	} catch (error) {
		if (error instanceof Error) {
			console.error("Printer error: " + error.message);
		} else {
			console.error("Printer error: " + error);
		}
	}
}

// Check printer status
setInterval(async () => {
	try {
		const connected = await invoke("printer_status", {});

		if (connected) {
			isPrinterConnected = true;
			console.log("Printer is connected");
		} else {
			isPrinterConnected = false;
			console.log("Printer is disconnected");
		}
	} catch (error: unknown) {
		isPrinterConnected = false;
		if (error instanceof Error) {
			console.error("Printer is disconnected with error: " + error.message);
		} else {
			console.error("Printer is disconnected with error: " + error);
		}
	}
}, 5000);
