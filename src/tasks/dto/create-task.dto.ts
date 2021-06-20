/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";

export class TaskDto {
  @IsNotEmpty()
  title: string;
  
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  color: string;

  user_id: number;

  task_status_id: number;
}
