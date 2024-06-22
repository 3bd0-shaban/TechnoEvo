import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';
import { PaginationArgs } from '~/shared/dto/args/pagination-query.args';
import { CurrentUser } from '../auth/decorator/auth-user.decorator';
import { UserEntity } from '../user/entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../auth/guards/admin.guard';
import { JwtUserGuard } from '../auth/guards/jwt-auth.guard';
import { BlogService } from '../blog/blog.service';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly blogService: BlogService,
  ) {}

  @Post('create-comment/:id')
  @ApiBearerAuth()
  @UseGuards(JwtUserGuard, AdminGuard)
  create(
    @Body() inputs: CreateCommentDto,
    @CurrentUser() user: UserEntity,
    @Param('id') blogId: number,
  ) {
    return this.commentService.create(inputs, blogId, user);
  }

  @Get('all-comments')
  @ApiBearerAuth()
  @UseGuards(JwtUserGuard, AdminGuard)
  async findAll(
    @Query() query: PaginationArgs,
  ): Promise<{ comments: CommentEntity[]; total: number }> {
    return await this.commentService.findAll(query);
  }

  @Get('all-comments/:blogId')
  async findBlogsComments(
    @Query() query: PaginationArgs,
    @Param('blogId') blogId: number,
  ): Promise<{ comments: CommentEntity[]; total: number }> {
    const blog = await this.blogService.findOne(blogId);
    return await this.commentService.findAllByBlog(query, blog);
  }

  @Get('get/:id')
  findOne(@Param('id') id: number): Promise<CommentEntity> {
    return this.commentService.findOne(id);
  }

  @Put('update/:id')
  @ApiBearerAuth()
  @UseGuards(JwtUserGuard, AdminGuard)
  async update(
    @Param('id') id: number,
    @Body() inputs: UpdateCommentDto,
  ): Promise<string> {
    await this.commentService.update(id, inputs);
    return 'ok';
  }

  @Delete('delete/:id')
  @ApiBearerAuth()
  @UseGuards(JwtUserGuard, AdminGuard)
  remove(@Param('id') id: number): Promise<void> {
    return this.commentService.removeById(id);
  }
}
