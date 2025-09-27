import { ApiProperty } from '@nestjs/swagger'
import { TaskStatus } from '@prisma/client'

export class TaskResponseDto {
  @ApiProperty({ example: 1 })
  id: number

  @ApiProperty({ example: 'Implement login page' })
  title: string

  @ApiProperty({
    example: 'Create login form with email and password fields',
    nullable: true,
  })
  description?: string | null

  @ApiProperty({ example: 'todo', enum: TaskStatus })
  status: TaskStatus

  @ApiProperty({ example: '2025-09-30T12:00:00.000Z', nullable: true })
  dueDate?: Date | null

  @ApiProperty({ example: '2025-09-14T10:00:00.000Z' })
  createdAt: Date

  @ApiProperty({ example: '2025-09-14T10:00:00.000Z' })
  updatedAt: Date

  @ApiProperty({ example: 1 })
  userId: number
}
