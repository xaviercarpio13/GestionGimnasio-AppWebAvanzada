import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const host = '26.172.2.131'; // Cambia por la IP que quieras usar
  const port = 3000;

  app.enableCors({
    origin: '*', // Permitir todos los orígenes
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Permitir todos los métodos HTTP
    allowedHeaders: '*', // Permitir todos los encabezados
  });

  await app.listen(port, host);
  console.log(`Aplicación corriendo en http://${host}:${port}`);
}
bootstrap();
