import { Test } from "@nestjs/testing";
import { TasksService } from "./tasks.service";
import { TaskRepository } from "./task.repository";

const mockTaskRepository = () => ({
  delete: jest.fn(),
  createTask: jest.fn(),
});

describe("TasksService", () => {
  let taskService;
  let taskRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();

    taskService = await module.get<TasksService>(TasksService);
    taskRepository = await module.get<TaskRepository>(TaskRepository);
  });

  // describe("deleteTask", () => {
  //   it("call tasks repo deleteTask() to delte a task", async () => {
  //     taskRepository.delete.mockResolvedValue({ affected: 1 });
  //     expect(taskRepository.delete).not.toHaveBeenCalled();
  //   });

  //   it("throw an error that task could not be found", () => {
  //     taskRepository.delete.mockResolvedValue({ affected: 0 });
  //     expect(taskService.deleteTask(1)).rejects.toThrow();
  //   });
  // });

  describe("createTask", () => {
    it("create task", async () => {
      expect(taskRepository.createTask).not.toHaveBeenCalled();
    });
  });
});
