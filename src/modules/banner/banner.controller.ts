import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  NotAcceptableException,
} from '@nestjs/common';
import { BannerService } from './banner.service';
import { JwtUserGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorator/auth-user.decorator';
import { UserEntity } from '../user/entities/user.entity';
import { BannerEntity } from './entities/banner.entity';
import { ErrorEnum } from '~/constants/error-code.constant';
import { BlogService } from '../blog/blog.service';

@ApiTags('Banner')
@ApiBearerAuth()
@Controller('banner')
export class BannerController {
  constructor(
    private readonly bannerService: BannerService,
    private readonly blogService: BlogService,
  ) {}

  @Post('create-banner/:id')
  @UseGuards(JwtUserGuard, AdminGuard)
  async create(@CurrentUser() user: UserEntity, @Param('id') blogId: number) {
    const blog = await this.blogService.findOne(blogId);
    const bannerByBlog = await this.bannerService.findByBlog(blog);
    if (!bannerByBlog) {
      throw new NotAcceptableException(ErrorEnum.BANNER_NOT_EXIST);
    }
    return this.bannerService.create(blog, user);
  }

  @Get('all-banners')
  @UseGuards(JwtUserGuard, AdminGuard)
  async findAll(): Promise<{ banners: BannerEntity[]; total: number }> {
    return await this.bannerService.findAll(true);
  }

  @Get('website')
  @UseGuards(JwtUserGuard)
  async websiteBanners(): Promise<{ banners: BannerEntity[]; total: number }> {
    return await this.bannerService.findAll();
  }

  @Get('get/:id')
  @UseGuards(JwtUserGuard, AdminGuard)
  findOne(@Param('id') id: number): Promise<BannerEntity> {
    return this.bannerService.findOne(id);
  }

  @Delete('delete/:id')
  @UseGuards(JwtUserGuard, AdminGuard)
  remove(@Param('id') id: number): Promise<void> {
    return this.bannerService.removeById(id);
  }
}
