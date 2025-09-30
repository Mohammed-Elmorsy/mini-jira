import {
  Body,
  Request,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  UseGuards,
  Patch,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { TaskService } from './task.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { TaskResponseDto } from './dtos/task-response.dto'
import { CreateTaskDto } from './dtos/create-task.dto'
import { UpdateTaskDto } from './dtos/update-task.dto'
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface'

@ApiTags('tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOkResponse({ type: TaskResponseDto })
  create(
    @Request() req: Express.Request,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<TaskResponseDto> {
    const user = req.user as JwtPayload
    return this.taskService.create(user.id, {
      ...createTaskDto,
      dueDate: createTaskDto.dueDate
        ? new Date(createTaskDto.dueDate)
        : undefined,
    })
  }

  @Get()
  @ApiOkResponse({ type: [TaskResponseDto] })
  findAll(): Promise<TaskResponseDto[]> {
    return this.taskService.findAll()
  }

  @Get(':id')
  @ApiOkResponse({ type: TaskResponseDto })
  findOne(@Param('id') id: string): Promise<TaskResponseDto | null> {
    return this.taskService.findOne(Number(id))
  }

  @Patch(':id')
  @ApiOkResponse({ type: TaskResponseDto })
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.taskService.update(Number(id), {
      ...updateTaskDto,
      dueDate: updateTaskDto.dueDate
        ? new Date(updateTaskDto.dueDate)
        : undefined,
    })
  }

  @Delete(':id')
  @ApiOkResponse({ type: TaskResponseDto })
  delete(@Param('id') id: string): Promise<TaskResponseDto> {
    return this.taskService.delete(Number(id))
  }
}
