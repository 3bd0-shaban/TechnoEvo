import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { BlogModule } from '../blog/blog.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannerEntity } from './entities/banner.entity';

@Module({
  imports: [BlogModule, TypeOrmModule.forFeature([BannerEntity])],
  controllers: [BannerController],
  providers: [BannerService],
})
export class BannerModule {}
