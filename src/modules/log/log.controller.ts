import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { LogService } from './log.service';
import { DashboardGuard } from '../auth/guards/dashboard.guard';
import { PaginationArgs } from '~/shared/dto/args/pagination-query.args';
import { LogEntity } from './entities/log.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Logs')
@ApiBearerAuth()
@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get('all-logs')
  @UseGuards(DashboardGuard)
  async findAll(
    @Query() query: PaginationArgs,
  ): Promise<{ logs: LogEntity[]; total: number }> {
    return await this.logService.findAll(query);
  }
}
