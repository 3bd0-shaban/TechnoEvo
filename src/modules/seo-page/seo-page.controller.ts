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
import { SeoPageService } from './seo-page.service';
import { CreateSeoPageDto } from './dto/create-seo.dto';
import { UpdateSeoPageDto } from './dto/update-seo.dto';
import { PaginationArgs } from '~/shared/dto/args/pagination-query.args';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LogService } from '../log/log.service';
import { CurrentUser } from '../auth/decorator/auth-user.decorator';
import { SeoWebsitePages } from './dto/args/seo-query.args';
import { SeoAnalyticsService } from '../analytics/seo-analytics/seo-analytics.service';
import { UserEntity } from '../user/entities/user.entity';
import { AdminGuard } from '../auth/guards/admin.guard';
import { JwtUserGuard } from '../auth/guards/jwt-auth.guard';
import { SeoPageEntity } from './entities/seo-page.entity';
import { SeoCountryService } from '../seo-country/seo-country.service';

@ApiTags('Seo Page')
@Controller('seo-page')
export class SeoPageController {
  constructor(
    private readonly seoService: SeoPageService,
    private readonly logService: LogService,
    private readonly seoCountryService: SeoCountryService,
    private readonly seoAnalyticsService: SeoAnalyticsService,
  ) {}

  @Post('/:country')
  @ApiBearerAuth()
  @UseGuards(JwtUserGuard, AdminGuard)
  async create(
    @Body() CreateMovieDto: CreateSeoPageDto,
    @Param('country') country: string,
    @CurrentUser() user: UserEntity,
  ) {
    const countrySeo = await this.seoCountryService.findOneByCountry(country);

    const seo = await this.seoService.create(CreateMovieDto, countrySeo);
    await this.logService.create(
      `create new seo for country ${seo.country} in page ${seo.page}`,
      user,
    );
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtUserGuard, AdminGuard)
  async findAll(
    @Query() query: PaginationArgs,
  ): Promise<{ seos: SeoPageEntity[]; results: number; total: number }> {
    return await this.seoService.findAll(query);
  }

  @Get('country/:country')
  @ApiBearerAuth()
  @UseGuards(JwtUserGuard, AdminGuard)
  async findAllByCountry(
    @Query() query: PaginationArgs,
    @Param('country') country: string,
  ): Promise<{ seos: SeoPageEntity[]; results: number; total: number }> {
    return await this.seoService.findSeoPagesByCountry(query, country);
  }

  @Get('get/:id')
  @ApiBearerAuth()
  @UseGuards(JwtUserGuard, AdminGuard)
  async findOne(@Param('id') id: number): Promise<SeoPageEntity> {
    return await this.seoService.findOneByID(id);
  }

  @Get('country')
  async findByCountryPage(
    @Query() query: SeoWebsitePages,
  ): Promise<SeoPageEntity> {
    const { code, page } = query;
    const seo = await this.seoService.findSeoByCountryAndPage(page, code);
    await this.seoAnalyticsService.saveSeoViewPerDay(page, code);
    return seo;
  }

  @Put('update/:id')
  @ApiBearerAuth()
  @UseGuards(JwtUserGuard, AdminGuard)
  async update(
    @Param('id') id: number,
    @CurrentUser() user: UserEntity,
    @Body() inputs: UpdateSeoPageDto,
  ) {
    await this.seoService.update(id, inputs);
    await this.logService.create(`updated seo record`, user);
  }

  @Delete('delete/:id')
  @ApiBearerAuth()
  @UseGuards(JwtUserGuard, AdminGuard)
  async remove(
    @Param('id') id: number,
    @CurrentUser() user: UserEntity,
  ): Promise<void> {
    await this.seoService.removeById(id);
    await this.logService.create(`deleted seo record`, user);
  }
}
