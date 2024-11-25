import { Module } from '@nestjs/common';
import { RecuperarPasswordService } from './recuperar-password.service';
import { RecuperarPasswordController } from './recuperar-password.controller';

@Module({
  controllers: [RecuperarPasswordController],
  providers: [RecuperarPasswordService],
})
export class RecuperarPasswordModule {}
