import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogEntity } from './entities/blog.entity';
import { CategoryEntity } from '../category/entities/category.entity';
import { MulterFileModule } from '~/shared/multer/multer-file.module';

@Module({
  imports: [
    MulterFileModule,
    TypeOrmModule.forFeature([BlogEntity, CategoryEntity]),
  ],
  controllers: [BlogController],
  providers: [BlogService],
  exports: [BlogService],
})
export class BlogModule {}