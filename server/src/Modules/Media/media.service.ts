import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from './entity/media.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private MediazReponsitory: Repository<Media>,
  ) {}
}
