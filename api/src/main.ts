import { NestFactory } from '@nestjs/core'
import { Logger, ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  /* ============================================= Pipes ============================================= */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  /* ============================================= CORS ============================================= */
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  })

  /* ============================================= Global Prefix ============================================= */
  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)

  /* ============================================= Swagger ============================================= */
  const config = new DocumentBuilder()
    .setTitle('Mini Jira API')
    .setDescription('API documentation for Mini Jira project')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)

  /* ============================================= Port Listening ============================================= */

  app.use((req, res, next) => {
    Logger.warn(`[${req.method}] ${req.originalUrl}`)
    next()
  })

  const port = process.env.PORT || 3000
  await app.listen(port)

  Logger.verbose(
    `Application is running on: http://localhost:${port}/${globalPrefix}`,
  )
}

bootstrap()
