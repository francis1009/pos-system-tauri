import Database from "@tauri-apps/plugin-sql";

let db: Database | null = null

export async function getDatabase(): Promise<Database> {
	if (db) {
		return db;
	}

	const loadedDb = await Database.load("sqlite:pos_system.db");
	db = loadedDb;
	return db;
}