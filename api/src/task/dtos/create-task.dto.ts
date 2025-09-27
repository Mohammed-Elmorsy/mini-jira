import { IsString, IsOptional, IsDateString, IsEnum } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { TaskStatus } from '@prisma/client'

export class CreateTaskDto {
  @ApiProperty({ example: 'Implement login page' })
  @IsString()
  title: string

  @ApiProperty({
    example: 'Create login form with email and password fields',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string

  @ApiProperty({ example: 'todo', enum: TaskStatus, default: 'todo' })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus

  @ApiProperty({ example: '2025-09-30T12:00:00.000Z', required: false })
  @IsOptional()
  @IsDateString()
  dueDate?: Date
}
