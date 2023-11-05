import { DataSource } from "typeorm";

export const myDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "1234",
  database: "coffeecontroll",
  entities: ["src/entities/*.ts"],
  logging: true,
  synchronize: true,
});
