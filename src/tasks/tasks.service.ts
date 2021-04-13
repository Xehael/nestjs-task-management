import { Injectable, NotFoundException, UsePipes, ValidationPipe } from '@nestjs/common';
import { Task, TaskStatus} from './tasks.model';
import { v1 as uuid} from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import {UpdateStatusDto} from './dto/update-status.dto';
@Injectable()
export class TasksService {
    private tasks: Task[] = []

    getAllTasks() : Task[] {
        return this.tasks;
    }

    createTask(createTask: CreateTaskDto): Task{
        const task: Task = {
            id: uuid(),
            title: createTask.title,
            description: createTask.description,
            status: TaskStatus.OPEN,
            priority: createTask.priority
          };
         this.tasks.push(task);
         return task;
    }

    @UsePipes(ValidationPipe)
    getTaskById(id : string): Task {
        const task : Task = this.tasks.find((task) => task.id === id);
        if(!task){
            throw new NotFoundException();
        }
        return task;
    }

    deleteTaskById(id: string) : Task[] {
        this.tasks = this.tasks.filter((task) => task.id !== id);
        return this.tasks;
    }
    updateStatusById(updateStatusDto: UpdateStatusDto) : Task {
        const task : Task = this.getTaskById(updateStatusDto.id)
        if(!task){
            throw new NotFoundException();
        }
        task.status = updateStatusDto.status;
        return task;
    }

    filterTasks(status: TaskStatus, keyword:string) : Task[] {
        const tasks = this.tasks.filter(
        (task) => task.status === status || 
        (task.title.includes(keyword) || task.description.includes(keyword))
        );
        return tasks;
    }
    

}
