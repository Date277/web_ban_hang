import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from './entity/media.entity';
import { MediaService } from './media.service';

@Module({
  imports: [TypeOrmModule.forFeature([Media])],
  controllers: [],
  providers: [MediaService],
  exports: [],
})
export class MediaModule {}
