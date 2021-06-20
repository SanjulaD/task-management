/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Task } from "./entities/task.entity";
import { TaskInterface } from "./entities/task.interface";
import { TaskDto } from "./dto/create-task.dto";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    private jwtService: JwtService
  ) {}

  async create(createTaskDto: TaskDto, request: Request): Promise<Task> {
    try {
      const cookie = request.cookies["token"];
      const data = await this.jwtService.verifyAsync(cookie);

      const { title, color, description } = createTaskDto;

      const task = new Task();
      task.title = title;
      task.description = description;
      task.color = color;
      task.user_id = data["id"];
      task.task_status_id = 1;

      return await this.taskRepository.save(task);
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
      return await this.taskRepository.find({ user_id: data["id"] });
    } catch (error) {
      throw new UnauthorizedException("Not Authorized");
    }
  }

  async findOne(id: number) {
    return await this.taskRepository.findOne(id);
  }

  async update(id: number, updateTask: TaskInterface) {
    return await this.taskRepository.update(id, updateTask);
  }

  async remove(id: number) {
    return await this.taskRepository.delete(id);
  }
}
