import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from '../dto/create-subscription.dto';
import { TipoSuscripcion } from '@prisma/client';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionsService.create(createSubscriptionDto);
  }

  @Get()
  findAll() {
    return this.subscriptionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.subscriptionsService.findOne(id);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.subscriptionsService.findByUserId(userId);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.subscriptionsService.remove(id);
  }

  
  @Patch(':id/renovar')
  async renovar(
    @Param('id', ParseIntPipe) id: number,
    @Query('tipoSuscripcion') tipoSuscripcion: TipoSuscripcion, // Tipo de suscripción como parámetro de consulta
  ) {
    return this.subscriptionsService.renovar(tipoSuscripcion, id);
  }
  
}
