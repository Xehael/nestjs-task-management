import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateStatusDto } from './dto/update-status.dto';


@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    // @Get()
    // getAllTasks(): Task[] {
    //     return this.tasksService.getAllTasks();
    // }

    @Get(':id')
    getTaskById(@Param ('id') id : string): Task {
        return this.tasksService.getTaskById(id);
    }

    @UsePipes(ValidationPipe)
    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {      
      return this.tasksService.createTask(createTaskDto);
    }

    @Delete(':id')
    deleteTaskById(@Param('id') id: string) : Task[] {
        return this.tasksService.deleteTaskById(id);
    }

    @Patch(':id')
    updateStatusById(@Body() updateTaskStatusDto : UpdateStatusDto): Task{
        return this.tasksService.updateStatusById(updateTaskStatusDto);
    }

    @Get()
    getAllTasks(@Query('status') status: TaskStatus, @Query('keyword') keyword: string) : Task[]
    {
        if(status || keyword){
            return this.tasksService.filterTasks(status, keyword);
        }
        else {
            return this.tasksService.getAllTasks();
        }
    }

}
