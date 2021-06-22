/* eslint-disable prettier/prettier */
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TasksController } from "./tasks.controller";
import { jwtConstants } from "./../auth/constants";
import { JwtModule } from "@nestjs/jwt";
import { TaskRepository } from "./task.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "1d" },
    }),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
