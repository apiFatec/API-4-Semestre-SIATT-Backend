import { PartialType } from '@nestjs/mapped-types';
import { CreateApi4SemDto } from './create-api-4-sem.dto';

export class UpdateApi4SemDto extends PartialType(CreateApi4SemDto) {}
