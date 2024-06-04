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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { PaginationArgs } from '~/shared/dto/args/pagination-query.args';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../auth/guards/admin.guard';
import { JwtUserGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Category')
@ApiBearerAuth()
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create-category')
  @UseGuards(JwtUserGuard, AdminGuard)
  create(@Body() inputs: CreateCategoryDto) {
    return this.categoryService.create(inputs);
  }

  @Get('all-categories')
  @UseGuards(JwtUserGuard, AdminGuard)
  async findAll(
    @Query() query: PaginationArgs,
  ): Promise<{ categories: CategoryEntity[]; total: number }> {
    return await this.categoryService.findAll(query);
  }

  @Get('get/:id')
  @UseGuards(JwtUserGuard, AdminGuard)
  findOne(@Param('id') id: number): Promise<CategoryEntity> {
    return this.categoryService.findOne(id);
  }

  @Put('update/:id')
  @UseGuards(JwtUserGuard, AdminGuard)
  async update(
    @Param('id') id: number,
    @Body() inputs: UpdateCategoryDto,
  ): Promise<string> {
    await this.categoryService.update(id, inputs);
    return 'ok';
  }

  @Delete('delete/:id')
  @UseGuards(JwtUserGuard, AdminGuard)
  remove(@Param('id') id: number): Promise<void> {
    return this.categoryService.removeById(id);
  }
}
