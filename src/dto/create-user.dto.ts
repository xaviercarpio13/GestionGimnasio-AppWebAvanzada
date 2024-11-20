import { IsString, IsNotEmpty, IsDateString, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsInt()
  @IsNotEmpty()
  rolId: number;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsDateString()
  fechaNac: string;

  @IsString()
  @IsNotEmpty()
  direccion: string;
  cuenta: {
    username: string;
    password: string;
    correoRecuperacion: string;
  };
}
// create-user.dto.ts
