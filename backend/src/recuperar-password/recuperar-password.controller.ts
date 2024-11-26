import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { RecuperarPasswordService } from './recuperar-password.service';

@Controller('recuperar-password')
export class RecuperarPasswordController {
  constructor(private readonly recuperarPasswordService: RecuperarPasswordService) {}

  @Post('send')
  async sendEmail(@Body() body: { email: string}) {
    const {email} = body;

    if (!email) {
      throw new HttpException(
        'Faltan parámetros requeridos (email).',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      // Llama al servicio para procesar la solicitud
      await this.recuperarPasswordService.handlePasswordRecovery(email);

      return { message: `Correo enviado exitosamente a ${email}.` };
    } catch (error) {
      throw new HttpException(
        `Error al procesar la solicitud: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
