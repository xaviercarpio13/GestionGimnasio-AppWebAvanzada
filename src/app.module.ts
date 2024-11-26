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
import { RecuperarPasswordController } from './recuperar-password/recuperar-password.controller';
import { RecuperarPasswordService } from './recuperar-password/recuperar-password.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
      defaults: {
        from: `"App Gym Gestión" <${process.env.MAIL_USER}>`,
      },
    }),
    UsersModule, PrismaModule, RolesModule, SubscriptionsModule, LoginModule, ChatWebsocketModule, RecuperarPasswordModule ],
  controllers: [UsersController, RolesController, SubscriptionsController, RecuperarPasswordController],
  providers: [UsuariosService, PrismaService, SubscriptionsService,RecuperarPasswordService],
})
export class AppModule {}
