/* eslint-disable prettier/prettier */
import { Task } from "./entities/task.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TasksController } from "./tasks.controller";
import { jwtConstants } from "./../auth/constants";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "1d" },
    }),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
