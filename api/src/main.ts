import { NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  })

  const port = process.env.PORT || 3000

  await app.listen(port)

  Logger.verbose(
    `Application is running on: http://localhost:${port}/${globalPrefix}`,
  )
}
bootstrap()
