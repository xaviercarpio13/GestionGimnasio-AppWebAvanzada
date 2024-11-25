import { Module } from '@nestjs/common';
import { UsersModule } from './usuarios/usuarios.modules';
import { UsersController } from './usuarios/usuarios.controller';
import { UsuariosService } from './usuarios/usuarios.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { RolesController } from './roles/roles.controller';
import { SubscriptionsService } from './subscriptions/subscriptions.service';
import { SubscriptionsController } from './subscriptions/subscriptions.controller';
import { RolesModule } from './roles/roles.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { LoginModule } from './login/login.module';
import { ChatWebsocketModule } from './chat-websocket/chat-websocket.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { RecuperarPasswordModule } from './recuperar-password/recuperar-password.module';

@Module({
  imports: [
      MailerModule.forRoot({
        transport: {
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // Usar `true` para 465, o `false` para otros puertos
          auth: {
            user: 'appgymgestion@hotmail.com', // Tu correo
            pass: 'appPassword', // Contraseña o token de aplicación
          },
        },
        defaults: {
          from: '"No Reply" <no-reply@tuapp.com>', // Dirección de correo por defecto
        },
        template: {
          dir: join(__dirname, 'templates'), // Ruta donde estarán tus plantillas
          adapter: new HandlebarsAdapter(), // Motor de plantillas
          options: {
            strict: true,
          },
        },
      }),
    UsersModule, PrismaModule, RolesModule, SubscriptionsModule, LoginModule, ChatWebsocketModule, RecuperarPasswordModule],
  controllers: [UsersController, RolesController, SubscriptionsController],
  providers: [UsuariosService, PrismaService, SubscriptionsService],
})
export class AppModule {}
