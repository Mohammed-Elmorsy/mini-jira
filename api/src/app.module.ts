import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'

import { AppConfigModule } from './configs/app-config.module'
import { PrismaModule } from './prisma/prisma.module'
import { UserModule } from './user/user.module'
import { TaskModule } from './task/task.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    AppConfigModule,
    PrismaModule,
    UserModule,
    TaskModule,
    AuthModule,
    // Rate limiter: 10 requests per minute
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
