import { Module } from '@nestjs/common';
import { FileDeleteService } from './services/file-delete.service';

@Module({
  providers: [FileDeleteService],
  exports: [FileDeleteService],
})
export class MulterFileModule {}
