use escpos::driver::*;
use escpos::errors::PrinterError;
use escpos::printer::Printer;
use escpos::utils::*;
use serde::{Deserialize, Serialize};
use std::sync::{Arc, Mutex};
use std::time::Duration;
use tauri::State;

#[derive(Deserialize)]
pub struct ReceiptItem {
    item_name: String,
    quantity: u32,
    item_price_at_sale: u32,
}

#[derive(Deserialize)]
pub struct ReceiptData {
    transaction_id: u32,
    items: Vec<ReceiptItem>,
    total: u32,
}

pub struct PrinterState(pub Arc<Mutex<UsbPrinter>>);

pub const PRINTER_VID: u16 = 0x0483;
pub const PRINTER_PID: u16 = 0x5840;

#[allow(dead_code)]
pub struct UsbPrinter {
    port: Printer<UsbDriver>,
}

impl UsbPrinter {
    pub fn build(vid: u16, pid: u16) -> Result<Self, PrinterError> {
        let driver = UsbDriver::open(vid, pid, Some(Duration::from_secs(10)), None)?;
        let printer = Printer::new(driver, Protocol::default(), None);
        Ok(Self { port: printer })
    }

    pub fn print_formatted_receipt(&mut self, data: &ReceiptData) -> Result<(), PrinterError> {
        let format_price =
            |price_cents: u32| -> String { format!("${:.2}", price_cents as f32 / 100.0) };

        self.port
            .init()?
            .justify(JustifyMode::CENTER)?
            .bold(true)?
            .writeln("Cabalen Grocery")?
            .writeln("304 Orchard Rd")?
            .writeln("Lucky Plaza, 04-40")?
            .writeln("Singapore 238863, Singapore")?
            .feed()?
            .bold(false)?
            .justify(JustifyMode::LEFT)?
            .writeln(&format!("Transaction ID: {}", data.transaction_id))?
            .writeln(&format!(
                "Date: {}",
                chrono::Local::now().format("%Y-%m-%d %H:%M:%S")
            ))?
            .writeln("--------------------------------")?;

        for item in &data.items {
            // Define the total width of a line on the receipt.
            const LINE_WIDTH: usize = 32;

            // --- 1. Word wrap the item name ---
            let mut wrapped_lines: Vec<String> = Vec::new();
            let mut current_line = String::new();

            for word in item.item_name.split_whitespace() {
                if current_line.is_empty() {
                    current_line.push_str(word);
                } else if current_line.len() + 1 + word.len() <= LINE_WIDTH {
                    current_line.push(' ');
                    current_line.push_str(word);
                } else {
                    wrapped_lines.push(current_line);
                    current_line = String::from(word);
                }
            }
            if !current_line.is_empty() {
                wrapped_lines.push(current_line);
            }

            // --- 2. Print the wrapped name lines ---
            for line in wrapped_lines {
                self.port.writeln(&line)?;
            }

            // --- 3. Print the formatted price line on a new line ---
            let item_price_str = format_price(item.item_price_at_sale);
            let line_total_str = format_price(item.item_price_at_sale * item.quantity);

            let left_part = format!("({}x {})", item.quantity, item_price_str);
            let right_part = line_total_str;

            let padding = LINE_WIDTH
                .saturating_sub(left_part.len())
                .saturating_sub(right_part.len());
            let line = format!("{}{}{}", left_part, " ".repeat(padding), right_part);
            self.port.writeln(&line)?;
        }

        self.port
            .writeln("--------------------------------")?
            .feed()?
            .bold(true)?
            .size(2, 2)? // Make the total larger
            .writeln(&format!("TOTAL: {}", format_price(data.total)))?
            .size(1, 1)? // Reset size
            .bold(false)?
            .feed()?
            .justify(JustifyMode::CENTER)?
            .writeln("Thank you for your purchase!")?
            .feed()?
            .feed()?
            .feed()?
            .print_cut()?;

        Ok(())
    }
}

#[derive(Debug, Serialize)]
pub struct CustomError {
    message: String,
}

impl From<PrinterError> for CustomError {
    fn from(error: PrinterError) -> Self {
        CustomError {
            message: format!("[Printer Error] {}", error),
        }
    }
}

#[tauri::command]
pub async fn print_receipt(
    state: State<'_, PrinterState>,
    data: ReceiptData,
) -> Result<(), CustomError> {
    let mut printer_instance = state.0.lock().unwrap();
    printer_instance.print_formatted_receipt(&data)?;
    drop(printer_instance);
    Ok(())
}
