import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common'

import { TaskService } from './task.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(
    @Body()
    body: {
      title: string
      description?: string
      status?: string
      dueDate?: string
      userId: number
    },
  ) {
    return this.taskService.create({
      ...body,
      dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
    })
  }

  @Get()
  findAll() {
    return this.taskService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(Number(id))
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.taskService.update(Number(id), {
      ...body,
      dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
    })
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.taskService.delete(Number(id))
  }
}
