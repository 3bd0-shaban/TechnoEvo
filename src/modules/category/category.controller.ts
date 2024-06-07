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
import { LogService } from '../log/log.service';
import { CurrentUser } from '../auth/decorator/auth-user.decorator';
import { UserEntity } from '../user/entities/user.entity';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly logService: LogService,
  ) {}

  @Post('create-category')
  @ApiBearerAuth()
  @UseGuards(JwtUserGuard, AdminGuard)
  async create(
    @Body() inputs: CreateCategoryDto,
    @CurrentUser() user: UserEntity,
  ) {
    const category = await this.categoryService.create(inputs);
    await this.logService.create(`created ${category.category} category`, user);
  }

  @Get('all-categories')
  async findAll(
    @Query() query: PaginationArgs,
  ): Promise<{ categories: CategoryEntity[]; total: number }> {
    return await this.categoryService.findAll(query);
  }

  @Get('get/:id')
  findOne(@Param('id') id: number): Promise<CategoryEntity> {
    return this.categoryService.findOne(id);
  }

  @Put('update/:id')
  @ApiBearerAuth()
  @UseGuards(JwtUserGuard, AdminGuard)
  async update(
    @Param('id') id: number,
    @Body() inputs: UpdateCategoryDto,
    @CurrentUser() user: UserEntity,
  ) {
    const category = await this.categoryService.update(id, inputs);
    await this.logService.create(
      `updated ${category.category} category name to ${inputs.category} category`,
      user,
    );
  }

  @Delete('delete/:id')
  @ApiBearerAuth()
  @UseGuards(JwtUserGuard, AdminGuard)
  async remove(@Param('id') id: number, @CurrentUser() user: UserEntity) {
    const category = await this.categoryService.removeById(id);
    await this.logService.create(`deleted ${category.category} category`, user);
  }
}
