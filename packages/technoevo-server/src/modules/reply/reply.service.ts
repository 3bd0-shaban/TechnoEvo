import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { ReplyEntity } from './entities/reply.entity';
import { ErrorEnum } from '~/constants/error-code.constant';
import { PaginationArgs } from '~/shared/dto/args/pagination-query.args';
import { BlogService } from '../blog/blog.service';
import { UserEntity } from '../user/entities/user.entity';
import { CommentService } from '../comment/comment.service';
import { CommentEntity } from '../comment/entities/comment.entity';

@Injectable()
export class ReplyService {
  constructor(
    @InjectRepository(ReplyEntity)
    private readonly replyRepository: Repository<ReplyEntity>,
    private readonly commentService: CommentService,
  ) {}

  /**
   * Create New reply
   *
   * @param {CreateReplyDto} inputs - entered inputs
   * @param {number} commentId - Comment ID
   * @param {UserEntity} user - user
   * @returns {Promise<ReplyEntity>} - Created reply entity
   * @memberof replyservice
   */
  async create(
    inputs: CreateReplyDto,
    commentId: number,
    user: UserEntity,
  ): Promise<ReplyEntity> {
    const { reply } = inputs;

    const comment = await this.commentService.findOne(commentId);
    if (!comment) {
      throw new Error(ErrorEnum.COMMENT_NOT_EXIST);
    }

    const replyDoc = this.replyRepository.create({
      reply,
      comment,
      user,
    });
    return await replyDoc.save();
  }

  /**
   * Get All replys with pagination
   *
   * @param {PaginationArgs} pagination - pagination inputs
   * @returns {Promise<{ replys: ReplyEntity[]; results: number; total: number }>} - Paginated replys
   * @memberof replyservice
   */
  async findAll(
    pagination: PaginationArgs,
  ): Promise<{ replys: ReplyEntity[]; results: number; total: number }> {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;
    const [replys, total] = await this.replyRepository.findAndCount({
      relations: ['user'],
      take: limit,
      skip,
    });
    return { total, results: replys.length, replys };
  }

  /**
   * Get All replys with pagination
   *
   * @param {PaginationArgs} pagination - pagination inputs
   * @param {CommentEntity} comment - Comment document
   * @returns {Promise<{ replys: ReplyEntity[]; results: number; total: number }>} - Paginated replys
   * @memberof replyservice
   */
  async findAllByComment(
    pagination: PaginationArgs,
    comment: CommentEntity,
  ): Promise<{ replys: ReplyEntity[]; results: number; total: number }> {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;
    const [replys, total] = await this.replyRepository.findAndCount({
      where: { comment },
      relations: ['user'],
      take: limit,
      skip,
    });
    return { total, results: replys.length, replys };
  }

  /**
   * Find a reply by ID
   *
   * @param {number} id - reply ID
   * @returns {Promise<ReplyEntity>} - The found reply
   * @throws {NotFoundException} - If the reply with the provided ID is not found
   */
  async findOne(id: number): Promise<ReplyEntity> {
    const reply = await this.replyRepository.findOneBy({ id });
    if (!reply) {
      throw new NotFoundException(ErrorEnum.REPLAY_NOT_EXIST);
    }
    return reply;
  }

  /**
   * Remove a reply by ID
   *
   * @param {number} replyId - reply ID
   * @throws {NotFoundException} - If the reply with the provided ID is not found
   */
  async removeById(replyId: number): Promise<void> {
    const reply = await this.findOne(replyId);
    await this.replyRepository.remove(reply);
  }

  /**
   * Update the currently authenticated reply
   *
   * @param {number} replyId - reply ID
   * @param {UpdatereplyDto} inputs - Updated reply params
   * @returns {Promise<UpdateResult>} - The updated reply
   */
  async update(replyId: number, inputs: UpdateReplyDto): Promise<UpdateResult> {
    return await this.replyRepository.update(replyId, inputs);
  }
}
