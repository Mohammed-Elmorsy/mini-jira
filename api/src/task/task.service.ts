import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common'

import { PrismaService } from '../prisma/prisma.service'
import { CreateTaskDto } from './dtos/create-task.dto'
import { UpdateTaskDto } from './dtos/update-task.dto'
import { TaskResponseDto } from './dtos/task-response.dto'

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async findAllByUserId(userId: number): Promise<TaskResponseDto[]> {
    return this.prisma.task.findMany({
      where: { userId },
      orderBy: { order: 'asc' },
    })
  }

  async create(
    userId: number,
    createTaskDto: CreateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.prisma.task.create({
      data: {
        ...createTaskDto,
        userId,
      },
    })
  }

  async update(
    userId: number,
    taskId: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    const task = await this.prisma.task.findUnique({ where: { id: taskId } })

    if (!task) {
      throw new NotFoundException('Task not found')
    }

    if (task.userId !== userId) {
      throw new ForbiddenException('You are not allowed to update this task')
    }

    return this.prisma.task.update({
      where: { id: taskId },
      data: updateTaskDto,
    })
  }

  async delete(userId: number, taskId: number): Promise<boolean> {
    const task = await this.prisma.task.findUnique({ where: { id: taskId } })

    if (!task) {
      throw new NotFoundException('Task not found')
    }

    if (task.userId !== userId) {
      throw new ForbiddenException('You are not allowed to delete this task')
    }

    await this.prisma.task.delete({ where: { id: taskId } })
    return true
  }
}
