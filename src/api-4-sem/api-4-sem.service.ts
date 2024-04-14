import { Injectable } from '@nestjs/common';
import { CreateApi4SemDto } from './dto/create-api-4-sem.dto';
import { UpdateApi4SemDto } from './dto/update-api-4-sem.dto';

@Injectable()
export class Api4SemService {
  create(createApi4SemDto: CreateApi4SemDto) {
    return 'This action adds a new api4Sem';
  }

  findAll() {
    return `This action returns all api4Sem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} api4Sem`;
  }

  update(id: number, updateApi4SemDto: UpdateApi4SemDto) {
    return `This action updates a #${id} api4Sem`;
  }

  remove(id: number) {
    return `This action removes a #${id} api4Sem`;
  }
}
