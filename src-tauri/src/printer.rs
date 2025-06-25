use escpos::driver::*;
use escpos::errors::PrinterError;
use escpos::printer::Printer;
use escpos::utils::*;
use serde::Serialize;
use std::time::Duration;

// Use for USB
// pub const PRINTER_VID: u16 = 0x0483;
// pub const PRINTER_PID: u16 = 0x5840;

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
pub async fn print_test() -> Result<(), CustomError> {
    let driver = SerialPortDriver::open("COM5", 9_600, Some(Duration::from_secs(5)))?;
    let mut printer = Printer::new(driver.clone(), Protocol::default(), None);

    printer.init()?.writeln("test")?.feed()?.print_cut()?;

    Ok(())
}

#[tauri::command]
pub async fn printer_status() -> Result<bool, CustomError> {
    let driver = SerialPortDriver::open("COM5", 9_600, Some(Duration::from_secs(5)))?;
    Printer::new(driver.clone(), Protocol::default(), None)
        .real_time_status(RealTimeStatusRequest::Printer)?
        .send_status()?;

    let mut buf = [0; 1];
    driver.read(&mut buf)?;

    // Online/Offline status
    let status = RealTimeStatusResponse::parse(RealTimeStatusRequest::Printer, buf[0])?;
    let r = status
        .get(&RealTimeStatusResponse::Online)
        .unwrap_or(&false);

    Ok(*r)
}

#[tauri::command]
pub async fn get_available_ports() -> Vec<String> {
    serialport::available_ports()
        .map(|ports| ports.into_iter().map(|p| p.port_name).collect())
        .unwrap_or_else(|_| Vec::new()) // Return an empty list on error
}
