import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BlogEntity } from './entities/blog.entity';
import { ErrorEnum } from '~/constants/error-code.constant';
import { In, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationArgs } from '~/shared/dto/args/pagination-query.args';
import { CategoryEntity } from '../category/entities/category.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogEntity)
    private readonly blogRepository: Repository<BlogEntity>,
    @InjectRepository(CategoryEntity)
    private readonly genreRepository: Repository<CategoryEntity>,
  ) {}

  /**
   * Create New blog
   *
   * @param {CreateBlogDto} inputs - entered inputs
   * @returns {Promise<BlogEntity>} - Created blog entity
   * @memberof blogservice
   */
  async create(inputs: CreateBlogDto): Promise<BlogEntity> {
    const { blog_Title, categories: categorieIds } = inputs;

    const exists = await this.blogRepository.findOneBy({
      blog_Title,
    });
    if (exists) {
      throw new ConflictException(ErrorEnum.BLOG_ALREADY_EXIST);
    }

    // Find genres by their IDs
    const genres = await this.genreRepository.find({
      where: { id: In(categorieIds) },
    });

    const blog = this.blogRepository.create({
      ...inputs,
      categories: genres,
    });

    return this.blogRepository.save(blog);
  }

  /**
   * Get All blogs with pagination
   *
   * @param {PaginationArgs} pagination - pagination inputs
   * @returns {Promise<{ blogs: BlogEntity[]; results: number; total: number }>} - Paginated blogs
   * @memberof blogservice
   */
  async findAll(
    pagination: PaginationArgs,
  ): Promise<{ blogs: BlogEntity[]; results: number; total: number }> {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;
    const [blogs, total] = await this.blogRepository.findAndCount({
      relations: ['genres'],
      take: limit,
      skip,
    });
    return { total, results: blogs.length, blogs };
  }

  /**
   * Find a blog by ID
   *
   * @param {number} id - blog ID
   * @returns {Promise<BlogEntity>} - The found blog
   * @throws {NotFoundException} - If the blog with the provided ID is not found
   */
  async findOne(id: number): Promise<BlogEntity> {
    const blog = await this.blogRepository.findOneBy({ id });
    if (!blog) {
      throw new NotFoundException(ErrorEnum.BLOG_NOT_EXIST);
    }
    return blog;
  }

  /**
   * Remove a blog by ID
   *
   * @param {number} blogId - blog ID
   * @throws {NotFoundException} - If the blog with the provided ID is not found
   */
  async removeById(blogId: number): Promise<void> {
    const blog = await this.findOne(blogId);
    await this.blogRepository.remove(blog);
  }

  /**
   * Update the currently authenticated blog
   *
   * @param {number} blogId - blog ID
   * @param {UpdateBlogDto} inputs - Updated blog params
   * @returns {Promise<UpdateResult>} - The updated blog
   */
  async update(blogId: number, inputs: UpdateBlogDto): Promise<UpdateResult> {
    return await this.blogRepository.update(blogId, inputs);
  }
}
