import { PartialType } from '@nestjs/mapped-types';
import { CreateRecuperarPasswordDto } from './create-recuperar-password.dto';

export class UpdateRecuperarPasswordDto extends PartialType(CreateRecuperarPasswordDto) {}
