import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateStatusDto } from "./dto/update-status.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const {title, description, priority} =  createTaskDto;

        const task = new Task();
        task.title = title;
        task.description = description;
        task.status =  TaskStatus.OPEN;
        task.priority = priority;
        await task.save();

        return task;
    }

    // async updateStatusById(updateStatusDto: UpdateStatusDto): Promise<Task> {
    //     const {status} =  updateStatusDto;
    //     task.status = status;

    //     await task.save();
    //     return task;
    // }
}