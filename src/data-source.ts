import "reflect-metadata";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DB_URL,
  // type: "postgres",
  // host: process.env.DB_HOST,
  // port: +(process.env.DB_PORT || 5432),
  // username: process.env.DB_USERNAME,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [__dirname + "src/entity/**/*.ts"],
  migrations: [],
  subscribers: [],
});

export default AppDataSource;
