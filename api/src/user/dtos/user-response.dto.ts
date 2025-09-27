import { ApiProperty } from '@nestjs/swagger'

export class UserResponseDto {
  @ApiProperty({ example: 1 })
  id: number

  @ApiProperty({ example: 'john@example.com' })
  email: string

  @ApiProperty({ example: 'John Doe', nullable: true })
  name?: string | null

  @ApiProperty({ example: '2025-09-14T10:00:00.000Z' })
  createdAt: Date

  @ApiProperty({ example: '2025-09-14T10:00:00.000Z' })
  updatedAt: Date
}
