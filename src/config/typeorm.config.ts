/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "todo_nest",
  autoLoadEntities: true,
  synchronize: true,
};
