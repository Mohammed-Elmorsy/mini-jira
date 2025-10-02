import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { TokenExpiredError } from 'jsonwebtoken'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'supersecret',
      ignoreExpiration: false,
    })
  }

  async validate(payload: { sub: number; email: string }) {
    // This is attached to req.user
    return { id: payload.sub, email: payload.email }
  }

  async validatePayload(payload: any) {
    try {
      return { userId: payload.sub, email: payload.email }
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        throw new UnauthorizedException('expired token')
      }
      throw new UnauthorizedException('invalid token')
    }
  }
}
