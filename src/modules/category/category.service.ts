import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository, UpdateResult } from 'typeorm';
import { ErrorEnum } from '~/constants/error-code.constant';
import { isEmpty } from 'lodash';
import { PaginationArgs } from '~/shared/dto/args/pagination-query.args';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  /**
   * Create New category
   *
   * @param {CreatecategoryDTO} createcategoryDto - enterted inputs
   * @returns {Promise<CategoryEntity>} - Password match result
   * @memberof categoryService
   */
  async create(inputs: CreateCategoryDto): Promise<CategoryEntity> {
    const { category } = inputs;
    const exists = await this.categoryRepository.findOneBy({
      category,
    });
    if (!isEmpty(exists)) {
      throw new ConflictException(ErrorEnum.CATEGORY_ALREADY_EXIST);
    }
    const categoryDoc = this.categoryRepository.create({
      ...inputs,
    });
    return await categoryDoc.save();
  }

  /**
   * Get All categorys with pagination
   *
   * @param {PaginationArgs} pagination - pagination inputs
   * @returns {Promise<{ categories: CategoryEntity[]; results: number; total: number }>} - Paginated categorys
   * @memberof categoryService
   */
  async findAll(
    pagination: PaginationArgs,
  ): Promise<{ categories: CategoryEntity[]; results: number; total: number }> {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;
    const [categories, total] = await this.categoryRepository.findAndCount({
      take: limit,
      skip,
    });
    return { total, results: categories.length, categories };
  }

  /**
   * Find a category by ID
   *
   * @param {number} id - category ID
   * @returns {Promise<CategoryEntity>} - The found category
   * @throws {NotFoundException} - If the category with the provided ID is not found
   */
  async findOne(id: number): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(ErrorEnum.CATEGORY_NOT_EXIST);
    }
    return category;
  }

  /**
   * Remove a category by ID
   *
   * @param {number} categoryID - category ID
   * @throws {NotFoundException} - If the category with the provided ID is not found
   */
  async removeById(categoryID: number): Promise<void> {
    const category = await this.findOne(categoryID);
    await this.categoryRepository.remove(category);
  }

  /**
   * Update the currently authenticated category
   *
   * @param {number} categoryId - category ID
   * @param {UpdatecategoryDTO} inputs - Updated category params
   * @returns {Promise<UpdateResult>} - The updated category
   */
  async update(
    categoryID: number,
    inputs: UpdateCategoryDto,
  ): Promise<UpdateResult> {
    return await this.categoryRepository.update(categoryID, inputs);
  }
}
