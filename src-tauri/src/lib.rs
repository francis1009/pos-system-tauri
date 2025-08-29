mod printer;

use crate::printer::{PrinterState, UsbPrinter, PRINTER_PID, PRINTER_VID};
use printer::print_receipt;
use std::sync::{Arc, Mutex};
use tauri::Manager;
use tauri_plugin_sql::{Migration, MigrationKind};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let state = PrinterState(Arc::new(Mutex::new(
        UsbPrinter::build(PRINTER_VID, PRINTER_PID)
            .expect("Failed to connect to printer on USB. Is it connected and on?"),
    )));

    tauri::Builder::default()
        .plugin(tauri_plugin_process::init())
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations(
                    "sqlite:pos_system.db",
                    vec![Migration {
                        version: 1,
                        description: "Initial migration",
                        kind: MigrationKind::Up,
                        sql: include_str!("../migrations/v1.sql"),
                    }],
                )
                .build(),
        )
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .setup({
            move |app| {
                app.manage(state);
                Ok(())
            }
        })
        .invoke_handler(tauri::generate_handler![print_receipt])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
