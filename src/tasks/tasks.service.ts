import { Injectable, NotFoundException, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskStatus } from "./task-status.enum";
import { v1 as uuid} from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import {UpdateStatusDto} from './dto/update-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { errorMonitor } from 'node:events';
@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {}

    async getAllTasks(): Promise<Task[]> {
        const tasks = await this.taskRepository.find();
        if(!tasks){
            throw new NotFoundException("Task not found")
        }
        return tasks;
    }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);
        if (!found) {
          throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return found;
      }


    async addTask(createTask: CreateTaskDto): Promise<Task>{
        const task = {
            id: uuid(),
            title: createTask.title,
            description: createTask.description,
            status: TaskStatus.OPEN,
            priority: createTask.priority
          };
          const insert = await this.taskRepository.createTask(task);
          if(!insert){
              throw new Error("Task not inserted");
          }
         return insert;
    } 

    async updateStatusById(updateStatusDto : UpdateStatusDto): Promise<Task>{
        const update : Task = await this.getTaskById(updateStatusDto.id)

        update.status = updateStatusDto.status;
        await update.save()
        return update;
    }

    async deleteTaskById(id: number): Promise<void> {
        const taskdeleted = await this.taskRepository.delete(id);
        if(taskdeleted.affected === 0){
            throw new NotFoundException(`Task ${id} not found`)
        }
    }

    // getAllTasks() : Task[] {
    //     return this.tasks;
    // }

    // createTask(createTask: CreateTaskDto): Task{
    //     const task: Task = {
    //         id: uuid(),
    //         title: createTask.title,
    //         description: createTask.description,
    //         status: TaskStatus.OPEN,
    //         priority: createTask.priority
    //       };
    //      this.tasks.push(task);
    //      return task;
    // }

    // @UsePipes(ValidationPipe)
    // getTaskById(id : string): Task {
    //     const task : Task = this.tasks.find((task) => task.id === id);
    //     if(!task){
    //         throw new NotFoundException();
    //     }
    //     return task;
    // }

    // deleteTaskById(id: string) : Task[] {
    //     this.tasks = this.tasks.filter((task) => task.id !== id);
    //     return this.tasks;
    // }
    // updateStatusById(updateStatusDto: UpdateStatusDto) : Task {
    //     const task : Task = this.getTaskById(updateStatusDto.id)
    //     if(!task){
    //         throw new NotFoundException();
    //     }
    //     task.status = updateStatusDto.status;
    //     return task;
    // }

    // filterTasks(status: TaskStatus, keyword:string) : Task[] {
    //     const tasks = this.tasks.filter(
    //     (task) => task.status === status || 
    //     (task.title.includes(keyword) || task.description.includes(keyword))
    //     );
    //     return tasks;
    // }
    

}
