import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Permitir todos los orígenes
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Permitir todos los métodos HTTP
    allowedHeaders: '*', // Permitir todos los encabezados
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
