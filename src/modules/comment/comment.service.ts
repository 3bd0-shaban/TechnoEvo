import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ErrorEnum } from '~/constants/error-code.constant';
import { CommentEntity } from './entities/comment.entity';
import { PaginationArgs } from '~/shared/dto/args/pagination-query.args';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { BlogService } from '../blog/blog.service';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    private readonly blogService: BlogService,
  ) {}

  /**
   * Create New comment
   *
   * @param {CreatecommentDto} inputs - entered inputs
   * @param {number} blogId - comment ID
   * @param {UserEntity} user - user
   * @returns {Promise<CommentEntity>} - Created comment entity
   * @memberof commentservice
   */
  async create(
    inputs: CreateCommentDto,
    blogId: number,
    user: UserEntity,
  ): Promise<CommentEntity> {
    const { comment } = inputs;

    // Check if the blog and user exist
    const blogExists = await this.blogService.findOne(blogId);

    if (!blogExists) {
      throw new Error('Blog not found');
    }

    const commentDoc = this.commentRepository.create({
      comment,
      blog: blogExists,
      user,
    });
    return await commentDoc.save();
  }

  /**
   * Get All comments with pagination
   *
   * @param {PaginationArgs} pagination - pagination inputs
   * @returns {Promise<{ comments: CommentEntity[]; results: number; total: number }>} - Paginated comments
   * @memberof commentservice
   */
  async findAll(
    pagination: PaginationArgs,
  ): Promise<{ comments: CommentEntity[]; results: number; total: number }> {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;
    const [comments, total] = await this.commentRepository.findAndCount({
      relations: ['user'],
      take: limit,
      skip,
    });
    return { total, results: comments.length, comments };
  }

  /**
   * Find a comment by ID
   *
   * @param {number} id - comment ID
   * @returns {Promise<CommentEntity>} - The found comment
   * @throws {NotFoundException} - If the comment with the provided ID is not found
   */
  async findOne(id: number): Promise<CommentEntity> {
    const comment = await this.commentRepository.findOneBy({ id });
    if (!comment) {
      throw new NotFoundException(ErrorEnum.COMMENT_NOT_EXIST);
    }
    return comment;
  }

  /**
   * Remove a comment by ID
   *
   * @param {number} commentId - comment ID
   * @throws {NotFoundException} - If the comment with the provided ID is not found
   */
  async removeById(commentId: number): Promise<void> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
      relations: ['replies'],
    });

    if (!comment) {
      throw new NotFoundException(ErrorEnum.COMMENT_NOT_EXIST);
    }

    await this.commentRepository.remove(comment);
  }

  /**
   * Update the currently authenticated comment
   *
   * @param {number} commentId - comment ID
   * @param {UpdatecommentDto} inputs - Updated comment params
   * @returns {Promise<UpdateResult>} - The updated comment
   */
  async update(
    commentId: number,
    inputs: UpdateCommentDto,
  ): Promise<UpdateResult> {
    return await this.commentRepository.update(commentId, inputs);
  }
}
