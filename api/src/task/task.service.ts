import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Task } from '@prisma/client'

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    title: string
    description?: string
    status?: string
    dueDate?: Date
    userId: number
  }): Promise<Task> {
    return this.prisma.task.create({ data })
  }

  async findAll(): Promise<Task[]> {
    return this.prisma.task.findMany()
  }

  async findOne(id: number): Promise<Task | null> {
    return this.prisma.task.findUnique({ where: { id } })
  }

  async update(id: number, data: Partial<Task>): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data,
    })
  }

  async delete(id: number): Promise<Task> {
    return this.prisma.task.delete({ where: { id } })
  }
}
