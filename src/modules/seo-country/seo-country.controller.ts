import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  Query,
} from '@nestjs/common';
import { SeoCountryService } from './seo-country.service';
import { CreateSeoCountryDto } from './dto/create-seo-country.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtUserGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { CurrentUser } from '../auth/decorator/auth-user.decorator';
import { UserEntity } from '../user/entities/user.entity';
import { LogService } from '../log/log.service';
import { SeoAnalyticsService } from '../analytics/seo-analytics/seo-analytics.service';
import { SeoCountryEntity } from './entities/seo-country.entity';
import { PaginationArgs } from '~/shared/dto/args/pagination-query.args';

@ApiTags('Seo Countries')
@ApiBearerAuth()
@Controller('seo-country')
export class SeoCountryController {
  constructor(
    private readonly seoService: SeoCountryService,
    private readonly logService: LogService,
    private readonly seoAnalyticsService: SeoAnalyticsService,
  ) {}

  @Post()
  @UseGuards(JwtUserGuard, AdminGuard)
  async create(
    @Body() inputs: CreateSeoCountryDto,
    @CurrentUser() user: UserEntity,
  ) {
    const seo = await this.seoService.create(inputs);
    await this.logService.create(
      `create new seo for country ${seo.country} in page ${seo.page}`,
      user,
    );
  }

  @Get()
  @UseGuards(JwtUserGuard, AdminGuard)
  async findAll(
    @Query() query: PaginationArgs,
  ): Promise<{ seos: SeoCountryEntity[]; results: number; total: number }> {
    return await this.seoService.findAll(query);
  }

  @Get('get/:country')
  @UseGuards(JwtUserGuard, AdminGuard)
  async findOne(@Param('country') country: string): Promise<SeoCountryEntity> {
    return await this.seoService.findOneByCountry(country);
  }

  @Put('main/:country')
  @UseGuards(JwtUserGuard, AdminGuard)
  async Main(
    @Param('country') country: string,
    @CurrentUser() user: UserEntity,
  ): Promise<void> {
    const seo = await this.seoService.MarkMain(country);
    await this.logService.create(
      `marked seo record for ${seo.country} country as main`,
      user,
    );
  }

  @Delete('delete/:country')
  @UseGuards(JwtUserGuard, AdminGuard)
  async remove(
    @Param('country') country: string,
    @CurrentUser() user: UserEntity,
  ): Promise<void> {
    await this.seoService.removeByCountry(country);
    await this.logService.create(`deleted seo record`, user);
  }
}
