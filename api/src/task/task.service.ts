import { Injectable } from '@nestjs/common'
import { Task } from '@prisma/client'

import { PrismaService } from '../prisma/prisma.service'
import { TaskResponseDto } from './dtos/task-response.dto'
import { CreateTaskDto } from './dtos/create-task.dto'

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: number,
    createTaskDto: CreateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.prisma.task.create({ data: { ...createTaskDto, userId } })
  }

  async findAll(): Promise<TaskResponseDto[]> {
    return this.prisma.task.findMany()
  }

  async findOne(id: number): Promise<TaskResponseDto | null> {
    return this.prisma.task.findUnique({ where: { id } })
  }

  async update(id: number, data: Partial<Task>): Promise<TaskResponseDto> {
    return this.prisma.task.update({
      where: { id },
      data,
    })
  }

  async delete(id: number): Promise<TaskResponseDto> {
    return this.prisma.task.delete({ where: { id } })
  }
}
