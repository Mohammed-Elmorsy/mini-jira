import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Patch,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { TaskService } from './task.service'
import { CreateTaskDto } from './dtos/create-task.dto'
import { UpdateTaskDto } from './dtos/update-task.dto'
import { TaskResponseDto } from './dtos/task-response.dto'
import { User } from '../auth/decorators/user.decorator'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

@ApiTags('tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @ApiOkResponse({ type: [TaskResponseDto] })
  findAll(
    @User('id', ParseIntPipe) userId: number,
  ): Promise<TaskResponseDto[]> {
    return this.taskService.findAllByUserId(userId)
  }

  @Post()
  @ApiOkResponse({ type: TaskResponseDto })
  create(
    @User('id', ParseIntPipe) userId: number,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.taskService.create(userId, createTaskDto)
  }

  @Patch('/reorder')
  @ApiOkResponse({ type: TaskResponseDto })
  reorder(
    @User('id', ParseIntPipe) userId: number,
    @Body() updatedTasks: { tasks: { id: number; order: number }[] },
  ): Promise<TaskResponseDto[]> {
    return this.taskService.reorder(userId, updatedTasks)
  }

  @Patch(':id')
  @ApiOkResponse({ type: TaskResponseDto })
  update(
    @User('id', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.taskService.update(userId, id, updateTaskDto)
  }

  @Delete(':id')
  @ApiOkResponse({ type: Boolean })
  delete(
    @User('id', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<boolean> {
    return this.taskService.delete(userId, id)
  }
}
