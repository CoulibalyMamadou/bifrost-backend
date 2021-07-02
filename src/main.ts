import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import {Logger} from '@nestjs/common'

async function bootstrap() {
  Logger.log('process.env DB_DATABASE', `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}?retryWrites=true&w=majority`)
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: '*',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
  })
  await app.listen(process.env.PORT || 8080)
}

bootstrap()
