import { Controller } from '@nestjs/common';
import { MediaService } from './media.service';

@Controller('/api/v1/media')
export class CategoryController {
  constructor(private readonly MediaService: MediaService) {}
}
