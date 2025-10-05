import { Injectable, NotFoundException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { PrismaService } from '../prisma/prisma.service'

import { UpdateUserDto } from './dtos/update-user-dto'
import { UserResponseDto } from './dtos/user-response.dto'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number): Promise<UserResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!user) throw new NotFoundException(`User with ID ${id} not found`)

    return user
  }

  async getUser(userId: number): Promise<UserResponseDto> {
    return this.findOne(userId)
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const { password, name } = updateUserDto

    const user = await this.prisma.user.findUnique({ where: { id } })
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }

    let hashedPassword: string | undefined = undefined
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10)
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        name: name ?? user.name,
        password: hashedPassword ?? user.password,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  }
}
