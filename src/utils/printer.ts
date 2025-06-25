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

// Check ESCPOS status from Tauri
export async function print_status() {
	try {
		await invoke("print_status", {});
		console.log("Print status");
	} catch (error) {
		console.error("Printer error: " + error.message);
	}
}

export async function fetch_ports() {
	try {
		const ports = await invoke("get_available_ports", {});
		console.log(ports);
	} catch (error) {
		console.error("Printer error: " + error.message);
	}
}
