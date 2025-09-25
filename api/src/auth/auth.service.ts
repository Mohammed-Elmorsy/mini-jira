import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(email: string, password: string, name?: string) {
    const hashed = await bcrypt.hash(password, 10)
    const user = await this.prisma.user.create({
      data: { email, password: hashed, name },
    })
    return this.signToken(user.id, user.email)
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } })
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials')
    }
    return this.signToken(user.id, user.email)
  }

  private signToken(userId: number, email: string) {
    const payload = { sub: userId, email }
    return {
      access_token: this.jwt.sign(payload),
    }
  }
}
