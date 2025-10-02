import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { TaskService } from './task.service'
import { CreateTaskDto } from './dtos/create-task.dto'
import { UpdateTaskDto } from './dtos/update-task.dto'
import { TaskResponseDto } from './dtos/task-response.dto'
import { User } from '../auth/decorators/user.decorator'

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @ApiOkResponse({ type: [TaskResponseDto] })
  findAll(@User('userId') userId: number): Promise<TaskResponseDto[]> {
    return this.taskService.findAllByUserId(userId)
  }

  @Post()
  @ApiOkResponse({ type: TaskResponseDto })
  create(
    @User('userId') userId: number,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.taskService.create(userId, createTaskDto)
  }

  @Put(':id')
  @ApiOkResponse({ type: TaskResponseDto })
  update(
    @User('userId') userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.taskService.update(userId, id, updateTaskDto)
  }

  @Delete(':id')
  @ApiOkResponse({ type: Boolean })
  delete(
    @User('userId') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<boolean> {
    return this.taskService.delete(userId, id)
  }
}
