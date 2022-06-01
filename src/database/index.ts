import { createConnection } from "typeorm";
createConnection();

// import {DataSource} from "typeorm";
// dataSource.connect();

// import ormconfig from "../../ormconfig.json"
// const MyDataSource = new DataSource(ormconfig)

// import { DataSource } from "typeorm";
// const AppDataSource = new DataSource({
//     "type": "postgres",
//     "host": "localhost",
//     "port": 5432,
//     "username": "postgres",
//     "password": "docker",
//     "database": "rper_database",
//     "migrations": [
//         ".src/database/migrations/*.ts"
//     ]
// })