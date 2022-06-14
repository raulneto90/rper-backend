if (process.env.DATABASE_URL === "postgres://postgres:docker@localhost:5432/rper_database") {
    module.exports = {
        "type": "postgres",
        "url": process.env.DATABASE_URL,
        "entities": [
            "./src/models/*.ts"
        ],
        "migrations": [
            "./src/database/migrations/*.ts"
        ],
        "cli": {
            "migrationsDir": "./src/database/migrations"
        }
    }
} else {
    module.exports = {
        "type": "postgres",
        "url": process.env.DATABASE_URL,
        "entities": [
            "./dist/models/*.ts"
        ],
        "migrations": [
            "./dist/database/migrations/*.ts"
        ],
        "cli": {
            "migrationsDir": "./src/database/migrations"
        }
    }
}