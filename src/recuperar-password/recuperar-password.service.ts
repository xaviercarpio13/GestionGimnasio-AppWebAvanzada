import { Injectable } from '@nestjs/common';
import { CreateRecuperarPasswordDto } from './dto/create-recuperar-password.dto';
import { UpdateRecuperarPasswordDto } from './dto/update-recuperar-password.dto';

@Injectable()
export class RecuperarPasswordService {
  create(createRecuperarPasswordDto: CreateRecuperarPasswordDto) {
    return 'This action adds a new recuperarPassword';
  }

  findAll() {
    return `This action returns all recuperarPassword`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recuperarPassword`;
  }

  update(id: number, updateRecuperarPasswordDto: UpdateRecuperarPasswordDto) {
    return `This action updates a #${id} recuperarPassword`;
  }

  remove(id: number) {
    return `This action removes a #${id} recuperarPassword`;
  }
}
