import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { AuthService } from './auth.service'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { RegisterDto } from './dtos/register.dto'
import { LoginDto } from './dtos/login.dto'
import { UserResponseDto } from 'src/user/dtos/user-response.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOkResponse({ type: UserResponseDto })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto)
  }

  @Post('login')
  @ApiOkResponse({
    schema: {
      example: {
        access_token: 'jwt.token.here',
      },
    },
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: UserResponseDto })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req: Express.Request) {
    // req.user is injected by JwtStrategy.validate()
    return req.user
  }
}
