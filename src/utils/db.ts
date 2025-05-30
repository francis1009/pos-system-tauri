import Database from "@tauri-apps/plugin-sql";

export const db = await Database.load("sqlite:pos_system.db");