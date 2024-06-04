import { Module } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { ReplyController } from './reply.controller';
import { CommentModule } from '../comment/comment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReplyEntity } from './entities/reply.entity';

@Module({
  imports: [CommentModule, TypeOrmModule.forFeature([ReplyEntity])],
  controllers: [ReplyController],
  providers: [ReplyService],
})
export class ReplyModule {}
