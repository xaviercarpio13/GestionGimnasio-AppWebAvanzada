import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsuariosService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

  @Put('update-password')
  async updatePassword(
    @Body() body: { correo: string; newPassword: string }
  ) {
    const { correo, newPassword } = body;

    if (!correo || !newPassword) {
      throw new HttpException(
        'El userId y la newPassword son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const updatedUser = await this.usersService.updateUserPassword(
        correo,newPassword,
      );

      return {
        message: 'Contraseña actualizada exitosamente.',
        user: updatedUser,
      };
    } catch (error) {
      throw new HttpException(
        `Error al actualizar la contraseña: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
