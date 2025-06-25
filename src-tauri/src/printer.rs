use escpos::driver::*;
use escpos::errors::PrinterError;
use escpos::printer::Printer;
use escpos::utils::*;
use serde::Serialize;
use std::sync::{Arc, Mutex};
use std::time::Duration;
use tauri::State;

#[allow(dead_code)]
pub struct ComPrinter {
    port: Printer<SerialPortDriver>,
}

impl ComPrinter {
    pub fn build() -> Result<Self, PrinterError> {
        let driver = SerialPortDriver::open("COM5", 9_600, Some(Duration::from_secs(5)))?;
        let printer = Printer::new(driver, Protocol::default(), None);

        Ok(Self { port: printer })
    }

    pub fn print_receipt(&mut self) -> Result<(), PrinterError> {
        self.port
            .init()?
            .smoothing(true)?
            .bold(true)?
            .underline(UnderlineMode::Single)?
            .writeln("Bold underline")?
            .justify(JustifyMode::CENTER)?
            .reverse(true)?
            .bold(false)?
            .writeln("Hello world - Reverse")?
            .feed()?
            .justify(JustifyMode::RIGHT)?
            .reverse(false)?
            .underline(UnderlineMode::None)?
            .size(2, 3)?
            .writeln("Hello world - Normal")?
            .writeln("")?
            .writeln("")?
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
pub async fn print_test(state: State<'_, Arc<Mutex<ComPrinter>>>) -> Result<(), CustomError> {
    let mut printer_instance = state.lock().unwrap();
    printer_instance.print_receipt()?;

    Ok(())
}
