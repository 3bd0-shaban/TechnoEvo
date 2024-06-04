import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
  Put,
} from '@nestjs/common';
import { ReplyService } from './reply.service';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtUserGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { UserEntity } from '../user/entities/user.entity';
import { CurrentUser } from '../auth/decorator/auth-user.decorator';
import { PaginationArgs } from '~/shared/dto/args/pagination-query.args';
import { ReplyEntity } from './entities/reply.entity';
import { CommentService } from '../comment/comment.service';

@ApiTags('Reply')
@ApiBearerAuth()
@Controller('reply')
export class ReplyController {
  constructor(
    private readonly replyService: ReplyService,
    private readonly commentServices: CommentService,
  ) {}

  @Post('create-reply/:id')
  @UseGuards(JwtUserGuard, AdminGuard)
  create(
    @Body() inputs: CreateReplyDto,
    @CurrentUser() user: UserEntity,
    @Param('id') blogId: number,
  ) {
    return this.replyService.create(inputs, blogId, user);
  }

  @Get('all-replies')
  @UseGuards(JwtUserGuard, AdminGuard)
  async findAll(
    @Query() query: PaginationArgs,
  ): Promise<{ replys: ReplyEntity[]; total: number }> {
    return await this.replyService.findAll(query);
  }

  @Get('get/:id')
  @UseGuards(JwtUserGuard, AdminGuard)
  findOne(@Param('id') id: number): Promise<ReplyEntity> {
    return this.replyService.findOne(id);
  }

  @Get('comment/:id')
  @UseGuards(JwtUserGuard, AdminGuard)
  async findAllByComment(
    @Query() query: PaginationArgs,
    @Param('id') id: number,
  ): Promise<{ replys: ReplyEntity[]; total: number }> {
    const comment = await this.commentServices.findOne(id);
    return await this.replyService.findAllByComment(query, comment);
  }

  @Put('update/:id')
  @UseGuards(JwtUserGuard, AdminGuard)
  async update(
    @Param('id') id: number,
    @Body() inputs: UpdateReplyDto,
  ): Promise<string> {
    await this.replyService.update(id, inputs);
    return 'ok';
  }

  @Delete('delete/:id')
  @UseGuards(JwtUserGuard, AdminGuard)
  remove(@Param('id') id: number): Promise<void> {
    return this.replyService.removeById(id);
  }
}
