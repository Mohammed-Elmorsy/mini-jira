import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { UserService } from './user.service'
import { CreateUserDto } from './dtos/create-user.dto'
import { UpdateUserDto } from './dtos/update-user-dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { UserResponseDto } from './dtos/user-response.dto'
import { User } from 'src/auth/decorators/user.decorator'

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile')
  @ApiOkResponse({ type: UserResponseDto })
  getUser(@User('id', ParseIntPipe) userId: number) {
    return this.userService.getUser(userId)
  }

  @Get(':id')
  @ApiOkResponse({ type: UserResponseDto })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(Number(id))
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserResponseDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto)
  }
}
