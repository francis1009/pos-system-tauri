mod printer;

use crate::printer::ComPrinter;
use printer::{get_available_ports, print_test, printer_status};
use std::sync::{Arc, Mutex};
use tauri::Manager;
use tauri_plugin_sql::{Migration, MigrationKind};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let state = Arc::new(Mutex::new(
        ComPrinter::build().expect("error while building printer"),
    ));

    tauri::Builder::default()
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
            let state = state.clone();
            move |app| {
                app.manage(state);
                Ok(())
            }
        })
        .invoke_handler(tauri::generate_handler![
            print_test,
            printer_status,
            get_available_ports
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
