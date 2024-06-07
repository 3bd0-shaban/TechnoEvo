import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { BannerEntity } from './entities/banner.entity';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorEnum } from '~/constants/error-code.constant';
import { BlogEntity } from '../blog/entities/blog.entity';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(BannerEntity)
    private readonly bannerRepository: Repository<BannerEntity>,
  ) {}

  /**
   * Create New Banner
   *
   * @param {BlogEntity} blog - Blog Documentation
   * @param {UserEntity} user - user who created the banner
   * @throws {NotAcceptableException} - If the already has six banners
   * @memberof bannerservice
   */
  async create(blog: BlogEntity, user: UserEntity): Promise<BannerEntity> {
    const bannerCount = await this.bannerRepository.count();
    if (bannerCount > 6) {
      throw new NotAcceptableException(ErrorEnum.MAXIMUM_BANNERS);
    }

    const bannerDoc = this.bannerRepository.create({
      blog,
      created_By: user,
    });
    return await bannerDoc.save();
  }

  /**
   * Get All banners with No pagination ( since it will 6 miximum banners)
   * @param {boolean} admin - pass it to true if it's required to show creator for admins only
   * @returns {Promise<{ banners: BannerEntity[]; results: number; total: number }>} - all banners
   * @memberof bannerservice
   */
  async findAll(admin?: boolean): Promise<{
    banners: BannerEntity[];
    results: number;
    total: number;
  }> {
    const isAdmin = admin ? ['created_By'] : [];
    const [banners, total] = await this.bannerRepository.findAndCount({
      relations: isAdmin,
    });
    return { total, results: banners.length, banners };
  }

  /**
   * Find a banner by ID
   *
   * @param {number} id - banner ID
   * @returns {Promise<BannerEntity>} - The found banner
   * @throws {NotFoundException} - If the banner with the provided ID is not found
   */
  async findOne(id: number): Promise<BannerEntity> {
    const banner = await this.bannerRepository.findOneBy({ id });
    if (!banner) {
      throw new NotFoundException(ErrorEnum.BANNER_NOT_EXIST);
    }
    return banner;
  }

  /**
   * Find a banner by blog
   *
   * @param {BlogEntity} blog - blog document
   * @returns {Promise<BannerEntity>} - The found banner
   * @throws {NotFoundException} - If the banner with the provided blog doc is not found
   */
  async findByBlog(blog: BlogEntity): Promise<BannerEntity> {
    const banner = await this.bannerRepository.findOneBy({ blog });
    if (!banner) {
      throw new NotFoundException(ErrorEnum.BANNER_NOT_EXIST);
    }
    return banner;
  }

  /**
   * Remove a banner by ID
   *
   * @param {number} bannerId - banner ID
   * @throws {NotFoundException} - If the banner with the provided ID is not found
   */
  async removeById(bannerId: number): Promise<void> {
    const banner = await this.findOne(bannerId);
    await this.bannerRepository.remove(banner);
  }
}
