import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecuperarPasswordService } from './recuperar-password.service';
import { CreateRecuperarPasswordDto } from './dto/create-recuperar-password.dto';
import { UpdateRecuperarPasswordDto } from './dto/update-recuperar-password.dto';

@Controller('recuperar-password')
export class RecuperarPasswordController {
  constructor(private readonly recuperarPasswordService: RecuperarPasswordService) {}

  @Post()
  create(@Body() createRecuperarPasswordDto: CreateRecuperarPasswordDto) {
    return this.recuperarPasswordService.create(createRecuperarPasswordDto);
  }

  @Get()
  findAll() {
    return this.recuperarPasswordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recuperarPasswordService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecuperarPasswordDto: UpdateRecuperarPasswordDto) {
    return this.recuperarPasswordService.update(+id, updateRecuperarPasswordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recuperarPasswordService.remove(+id);
  }
}
