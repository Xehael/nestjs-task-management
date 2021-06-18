import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Task } from './task.entity';


@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get('getAllTasks')
    getAllTasks():Promise<Task[]>{
        console.log("GET ALL TASK");
        return this.tasksService.getAllTasks();
    }

    @Get('/:id')
    async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
    }

    @Post('addTask')
    @UsePipes(ValidationPipe)
    addTask(@Body() createTaskDto: CreateTaskDto ){
      console.log("ADD TASK")
     if(createTaskDto)
     {
      return this.tasksService.addTask(createTaskDto);
     }
    }

    @Patch('/updateStatus')
    @UsePipes(ValidationPipe)
    updateStatusById(@Body() updateTaskStatusDto : UpdateStatusDto): Promise<Task>{
        console.log("UPDATE TASK STATUS")
        return this.tasksService.updateStatusById(updateTaskStatusDto);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: number) : Promise<void> {
        console.log("DELETE TASK");
        return this.tasksService.deleteTaskById(id);
    }



    // @Get()
    // getAllTasks(): Task[] {
    //     return this.tasksService.getAllTasks();
    // }

    // @Get(':id')
    // getTaskById(@Param ('id') id : string): Task {
    //     return this.tasksService.getTaskById(id);
    // }

    // @UsePipes(ValidationPipe)
    // @Post()
    // createTask(@Body() createTaskDto: CreateTaskDto): Task {      
    //   return this.tasksService.createTask(createTaskDto);
    // }

    // @Delete(':id')
    // deleteTaskById(@Param('id') id: string) : Task[] {
    //     return this.tasksService.deleteTaskById(id);
    // }

    // @Patch(':id')
    // updateStatusById(@Body() updateTaskStatusDto : UpdateStatusDto): Task{
    //     return this.tasksService.updateStatusById(updateTaskStatusDto);
    // }

    // @Get()
    // getAllTasks(@Query('status') status: TaskStatus, @Query('keyword') keyword: string) : Task[]
    // {
    //     if(status || keyword){
    //         return this.tasksService.filterTasks(status, keyword);
    //     }
    //     else {
    //         return this.tasksService.getAllTasks();
    //     }
    // }

}
