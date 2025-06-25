import { invoke } from "@tauri-apps/api/core";

// Print ESCPOS from Tauri
export async function print_test() {
	try {
		await invoke("print_test", {});
		console.log("Print success");
	} catch (error) {
		console.error("Printer error: " + error.message);
	}
}
