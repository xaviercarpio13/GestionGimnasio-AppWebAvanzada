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

@Module({
  imports: [UsersModule, PrismaModule, RolesModule, SubscriptionsModule, LoginModule, ChatWebsocketModule],
  controllers: [UsersController, RolesController, SubscriptionsController],
  providers: [UsuariosService, PrismaService, SubscriptionsService],
})
export class AppModule {}
