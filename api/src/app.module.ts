import { Module } from '@nestjs/common'

import { AppConfigModule } from './configs/app-config.module'
import { PrismaModule } from './prisma/prisma.module'
import { UserModule } from './user/user.module'
import { TaskModule } from './task/task.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [AppConfigModule, PrismaModule, UserModule, TaskModule, AuthModule],
})
export class AppModule {}
