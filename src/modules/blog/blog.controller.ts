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
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  ParseIntPipe,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PaginationArgs } from '~/shared/dto/args/pagination-query.args';
import { BlogEntity } from './entities/blog.entity';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiTags,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { AdminGuard } from '../auth/guards/admin.guard';
import { JwtUserGuard } from '../auth/guards/jwt-auth.guard';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadPipe } from '~/shared/services/file-upload.pipe';

@ApiTags('Blogs')
@ApiBearerAuth()
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('create-blog')
  @UseInterceptors(FileInterceptor('thumbnail'))
  @UseGuards(JwtUserGuard, AdminGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create Blog',
    type: CreateBlogDto,
    required: true,
  })
  @ApiResponse({
    status: 201,
    description: 'The blog has been successfully created.',
    type: BlogEntity,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(
    @Body() inputs: CreateBlogDto,
    @UploadedFile(FileUploadPipe) file: Express.Multer.File,
  ): Promise<BlogEntity> {
    if (!file) {
      throw new BadRequestException('Thumbnail is required');
    }
    return this.blogService.create(inputs, file.path);
  }

  @Get('all-blogs')
  @ApiResponse({
    status: 200,
    description: 'List of all blogs',
    schema: {
      type: 'object',
      properties: {
        blogs: {
          type: 'array',
          items: { $ref: getSchemaPath(BlogEntity) },
        },
        total: { type: 'number' },
      },
    },
  })
  async findAll(
    @Query() query: PaginationArgs,
  ): Promise<{ blogs: BlogEntity[]; total: number }> {
    return await this.blogService.findAll(query);
  }

  @Get('get/:id')
  @UseGuards(JwtUserGuard, AdminGuard)
  @ApiResponse({
    status: 200,
    description: 'The blog has been found',
    type: BlogEntity,
  })
  @ApiResponse({ status: 404, description: 'Blog not found' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<BlogEntity> {
    const blog = await this.blogService.findOne(id);
    if (!blog) {
      throw new BadRequestException('Blog not found');
    }
    return blog;
  }

  @Put('update/:id')
  @UseGuards(JwtUserGuard, AdminGuard)
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
    },
    description: 'The blog has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Blog not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() inputs: UpdateBlogDto,
  ): Promise<string> {
    await this.blogService.update(id, inputs);
    return 'ok';
  }

  @Delete('delete/:id')
  @UseGuards(JwtUserGuard, AdminGuard)
  @ApiResponse({
    status: 200,
    description: 'The blog has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Blog not found' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.blogService.removeById(id);
  }
}
