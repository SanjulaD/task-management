import { EntityRepository, Repository } from "typeorm";
import { Task } from "./entities/task.entity";
import { TaskDto } from "./dto/create-task.dto";
import { UnauthorizedException } from "@nestjs/common";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDTO: TaskDto, data): Promise<Task> {
    try {
      const { title, color, description } = createTaskDTO;

      const task = new Task();
      task.title = title;
      task.description = description;
      task.color = color;
      task.user_id = data["id"];
      task.task_status_id = 1;

      return await this.save(task);
    } catch (error) {
      throw new UnauthorizedException("Entered Details Failed");
    }
  }

  async findTask(data) {
    try {
      const tasks = await this.find({ user_id: data["id"] });
      return tasks;
    } catch (error) {
      throw new UnauthorizedException("Not Authorized");
    }
  }
}
