import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Api4SemService } from './api-4-sem.service';
import { CreateApi4SemDto } from './dto/create-api-4-sem.dto';
import { UpdateApi4SemDto } from './dto/update-api-4-sem.dto';

@Controller('api-4-sem')
export class Api4SemController {
  constructor(private readonly api4SemService: Api4SemService) {}

  @Post()
  create(@Body() createApi4SemDto: CreateApi4SemDto) {
    return this.api4SemService.create(createApi4SemDto);
  }

  @Get()
  findAll() {
    return this.api4SemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.api4SemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApi4SemDto: UpdateApi4SemDto) {
    return this.api4SemService.update(+id, updateApi4SemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.api4SemService.remove(+id);
  }
}
