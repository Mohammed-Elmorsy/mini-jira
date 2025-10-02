import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err || !user) {
      // info contains the original error from passport-jwt
      if (info instanceof TokenExpiredError) {
        throw new UnauthorizedException('expired token')
      }
      if (info instanceof JsonWebTokenError) {
        throw new UnauthorizedException('invalid token')
      }
      throw new UnauthorizedException('unauthorized')
    }
    return user
  }
}
