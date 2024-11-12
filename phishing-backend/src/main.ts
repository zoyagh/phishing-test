import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './common/config/swagger.config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
    cors: {
      origin: '*',
      credentials: false,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: 'Content-Type, Authorization', 
    },
    logger: ['error', 'warn', 'debug', 'log'],
  });
 
  setupSwagger(app);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, 
    }),
  );
  const configService = app.get(ConfigService);
  const port = configService.get('app.port');
  await app.listen(port);

  console.info(`server running on ${await app.getUrl()}`);
}
bootstrap();
