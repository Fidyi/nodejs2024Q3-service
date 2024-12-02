import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { LoggingService } from './logging/logging.service';


dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(LoggingService);
  process.on('uncaughtException', (err: Error) => {
    logger.error(`Uncaught Exception: ${err.message}`, err.stack);
  });
  process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
    logger.error(
      `Unhandled Rejection at: ${promise}, reason: ${reason}`,
      reason instanceof Error ? reason.stack : '',
    );
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('API documentation for the Home Library Service')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  const docPath = path.join(__dirname, '..', 'doc');
  if (!fs.existsSync(docPath)) {
    fs.mkdirSync(docPath);
  }
  fs.writeFileSync(
    path.join(docPath, 'openapi-spec.json'),
    JSON.stringify(document, null, 2),
  );
  const PORT = process.env.PORT || 4000;
  await app.listen(PORT, () => {
    logger.log(`Application is running on: http://localhost:${PORT}`, 'Bootstrap');
  });
}
bootstrap();
