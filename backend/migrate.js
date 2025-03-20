const fs = require("fs");
const path = require("path");
const db = require("./src/config/db"); 

async function runMigration() {
    try {
        const files = ["create_category_table.sql"];

        for (const file of files) {
            const migrationFilePath = path.join(__dirname, "migrations", file);
            const sql = fs.readFileSync(migrationFilePath, "utf-8");

            // Split SQL file into separate queries (handles multiple statements)
            const queries = sql.split(/;\s*$/m).filter(query => query.trim().length > 0);
            
            for (const query of queries) {
                await db.execute(query);
            }

            console.log(`✅ Migration completed: ${file} executed!`);
        }
    } catch (error) {
        console.error("❌ Migration failed:", error);
    }
}

runMigration();
