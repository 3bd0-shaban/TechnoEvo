import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogEntity } from './entities/log.entity';
import { Repository } from 'typeorm';
import { PaginationArgs } from '~/shared/dto/args/pagination-query.args';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(LogEntity)
    private readonly logRepository: Repository<LogEntity>,
  ) {}

  /**
   * Create a new log action
   *
   * @param {string} content - Log content
   * @param {UserEntity} admin - Admin entity
   * @returns {Promise<LogEntity>} - The created log entity
   */
  async create(content: string, admin: UserEntity): Promise<LogEntity> {
    const log = this.logRepository.create({ content, admin });
    return await log.save();
  }

  /**
   * find all logs action
   *
   * @param {PaginationArgs} pagination - pagination inputs
   * @returns {Promise<{ users: LogEntity[]; results: number; total: number }>} - Paginated Logs
   * @memberof LogService
   */
  async findAll(
    pagination: PaginationArgs,
  ): Promise<{ logs: LogEntity[]; results: number; total: number }> {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;
    const [logs, total] = await this.logRepository.findAndCount({
      relations: ['admin'],
      take: limit,
      skip,
    });
    return { total, results: logs.length, logs };
  }
}
