/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Req,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TaskDto } from "./dto/create-task.dto";
import { Task } from "./entities/task.entity";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Controller("task")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createTask(@Body() task: TaskDto, @Req() request: Request) {
    return await this.tasksService.createTask(task, request);
  }

  @Get()
  async findAll() {
    return await this.tasksService.findAll();
  }

  @Get("user")
  async findAllTaskByUser(@Req() request: Request) {
    return await this.tasksService.findAllTaskByUser(request);
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<Task> {
    return await this.tasksService.findOne(+id);
  }

  @Patch(":id")
  @UsePipes(ValidationPipe)
  async update(@Param("id") id: number, @Body() updateTask: TaskDto) {
    return await this.tasksService.update(+id, updateTask);
  }

  @Delete(":id")
  async remove(@Param("id") id: number) {
    return await this.tasksService.deleteTask(+id);
  }
}
