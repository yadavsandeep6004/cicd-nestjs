import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth-guards';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ stopAtFirstError: true, transform: true }),
);
// app.useGlobalGuards(new JwtAuthGuard());

  await app.listen(3005);
}
bootstrap();
