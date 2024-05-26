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
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { DashboardGuard } from '../auth/guards/dashboard.guard';
import { PaginationArgs } from '~/shared/dto/args/pagination-query.args';
import { BlogEntity } from './entities/blog.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Blogs')
@ApiBearerAuth()
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('create-blog')
  @UseGuards(DashboardGuard)
  create(@Body() inputs: CreateBlogDto) {
    return this.blogService.create(inputs);
  }

  @Get('all-blogs')
  @UseGuards(DashboardGuard)
  async findAll(
    @Query() query: PaginationArgs,
  ): Promise<{ blogs: BlogEntity[]; total: number }> {
    return await this.blogService.findAll(query);
  }

  @Get('get/:id')
  @UseGuards(DashboardGuard)
  findOne(@Param('id') id: number): Promise<BlogEntity> {
    return this.blogService.findOne(id);
  }

  @Put('update/:id')
  @UseGuards(DashboardGuard)
  async update(
    @Param('id') id: number,
    @Body() inputs: UpdateBlogDto,
  ): Promise<string> {
    await this.blogService.update(id, inputs);
    return 'ok';
  }

  @Delete('delete/:id')
  @UseGuards(DashboardGuard)
  remove(@Param('id') id: number): Promise<void> {
    return this.blogService.removeById(id);
  }
}
