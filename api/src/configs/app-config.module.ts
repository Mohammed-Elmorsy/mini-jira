import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { configuration, getConfigPath, validationSchema } from './configuration'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [getConfigPath()],
      load: [configuration],
      validationSchema,
      expandVariables: true,
    }),
  ],
})
export class AppConfigModule {}
