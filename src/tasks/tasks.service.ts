/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./entities/task.entity";
import { TaskInterface } from "./entities/task.interface";
import { TaskDto } from "./dto/create-task.dto";
import { Request } from "express";
import { TaskRepository } from "./task.repository";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
    private jwtService: JwtService
  ) {}

  async createTask(createTaskDto: TaskDto, request: Request): Promise<Task> {
    try {
      const cookie = request.cookies["token"];
      const data = await this.jwtService.verifyAsync(cookie);
      if (data) {
        return await this.taskRepository.createTask(createTaskDto, data);
      }
    } catch (error) {
      throw new UnauthorizedException("Entered Details Failed");
    }
  }

  async findAll() {
    return await this.taskRepository.find();
  }

  async findAllTaskByUser(request: Request) {
    try {
      const cookie = request.cookies["token"];
      const data = await this.jwtService.verifyAsync(cookie);
      if (data) {
        return await this.taskRepository.findTask(data);
      }
    } catch (error) {
      throw new UnauthorizedException("Entered Details Failed");
    }
  }

  async findOne(id: number) {
    return await this.taskRepository.findOne(id);
  }

  async update(id: number, updateTask: TaskInterface) {
    return await this.taskRepository.update(id, updateTask);
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}
