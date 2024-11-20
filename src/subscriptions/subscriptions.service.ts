import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubscriptionDto } from '../dto/create-subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(private prisma: PrismaService) {}

  create(createSubscriptionDto: CreateSubscriptionDto & { fechaFin: Date }) {
    return this.prisma.suscripcion.create({
      data: {
        usuarioId: createSubscriptionDto.usuarioId,
        tipo: createSubscriptionDto.tipo,
        fechaFin: this.calcularFechaFin(createSubscriptionDto.tipo),
      },
    });
  }

  findAll() {
    return this.prisma.suscripcion.findMany({
      include: {
        usuario: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.suscripcion.findUnique({
      where: { id },
      include: {
        usuario: true,
      },
    });
  }

  findByUserId(usuarioId: number) {
    return this.prisma.suscripcion.findUnique({
      where: { usuarioId },
      include: {
        usuario: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.suscripcion.delete({
      where: { id },
    });
  }

  async renovar(tipoSuscripcion: string, id: number) {
    const suscripcion = await this.findOne(id);
    if (!suscripcion) {
      throw new Error(`La suscripción con id ${id} no existe.`);
    }

    const nuevaFechaFin = this.calcularFechaFin(tipoSuscripcion);
    return this.prisma.suscripcion.update({
      where: { id },
      data: {
        fechaFin: nuevaFechaFin,
      },
    });
  }

  private calcularFechaFin(
    tipoSuscripcion: string,
    fechaInicio: Date = new Date(),
  ): Date {
    const fechaFin = new Date(fechaInicio);

    switch (tipoSuscripcion.toUpperCase()) {
      case 'SEMANAL':
        fechaFin.setDate(fechaFin.getDate() + 7);
        break;
      case 'MENSUAL':
        fechaFin.setMonth(fechaFin.getMonth() + 1);
        break;
      case 'TRIMESTRAL':
        fechaFin.setMonth(fechaFin.getMonth() + 3);
        break;
      case 'SEMESTRAL':
        fechaFin.setMonth(fechaFin.getMonth() + 6);
        break;
      case 'ANUAL':
        fechaFin.setFullYear(fechaFin.getFullYear() + 1);
        break;
      default:
        throw new Error(
          `Tipo de suscripción "${tipoSuscripcion}" no es válido.`,
        );
    }

    return fechaFin;
  }
}
