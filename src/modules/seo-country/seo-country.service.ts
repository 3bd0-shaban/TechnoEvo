import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSeoCountryDto } from './dto/create-seo-country.dto';
import { ErrorEnum } from '~/constants/error-code.constant';
import { isEmpty } from 'lodash';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeoCountryEntity } from './entities/seo-country.entity';
import { PaginationArgs } from '~/shared/dto/args/pagination-query.args';
import { SeoPageService } from '../seo-page/seo-page.service';

@Injectable()
export class SeoCountryService {
  constructor(
    @InjectRepository(SeoCountryEntity)
    private readonly seoRepository: Repository<SeoCountryEntity>,
    // private readonly seoPages: SeoPageService,
  ) {}

  /**
   * Create New seo
   *
   * @param {CreateSeoCountryDto} inputs - entered inputs
   * @returns {Promise<SeoCountryEntity>} - Created seo entity
   * @memberof seoservice
   */
  async create(inputs: CreateSeoCountryDto): Promise<SeoCountryEntity> {
    const { country } = inputs;
    await this.validateSeoCountryExists(country);

    const seo = this.seoRepository.create({
      ...inputs,
    });

    return this.seoRepository.save(seo);
  }

  /**
   * Get All seo countries with pagination
   *
   * @param {PaginationArgs} pagination - pagination inputs
   * @returns {Promise<{ seos: SeoCountryEntity[]; results: number; total: number }>} - Paginated seos
   * @memberof seoservice
   */
  async findAll(
    pagination: PaginationArgs,
  ): Promise<{ seos: SeoCountryEntity[]; results: number; total: number }> {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;
    const [seos, total] = await this.seoRepository.findAndCount({
      take: limit,
      skip,
    });
    return { total, results: seos.length, seos };
  }

  /**
   * Find a seo by country code
   *
   * @param {string} country - country code
   * @returns {Promise<SeoCountryEntity>} - The found seo
   * @throws {NotFoundException} - If the seo with the provided country code is not found
   */
  async findOneByCountry(country: string): Promise<SeoCountryEntity> {
    const seo = await this.seoRepository.findOneBy({ country });
    if (!seo) {
      throw new NotFoundException(ErrorEnum.SEO_COUNTRY_NOT_EXIST);
    }
    return seo;
  }

  /**
   * Find a seo by country code
   *
   * @returns {Promise<SeoCountryEntity>} - The found seo
   * @throws {NotFoundException} - If the seo with the provided country code is not found
   */
  async findMainSeo(): Promise<SeoCountryEntity> {
    const seo = await this.seoRepository.findOneBy({ is_Main: true });
    if (!seo) {
      throw new NotFoundException(ErrorEnum.SEO_COUNTRY_NO_MAIN);
    }
    return seo;
  }

  /**
   * mark seo as main
   *
   * @param {string} country - country code
   * @returns {Promise<UpdateResult>} - The updated seo
   */
  async MarkMain(country: string): Promise<SeoCountryEntity> {
    await this.seoRepository.query('BEGIN');

    // Update all SEO entries with is_Main true to false
    await this.seoRepository
      .createQueryBuilder()
      .update(SeoCountryEntity)
      .set({ is_Main: false })
      .where('is_Main = :is_Main', { is_Main: true })
      .execute();

    // Find the SEO entry country code
    const seo = await this.seoRepository.findOneBy({ country });

    if (!seo) {
      // Rollback the transaction if SEO with the specified country code is not found
      await this.seoRepository.query('ROLLBACK');
      throw new NotFoundException(ErrorEnum.SEO_COUNTRY_NOT_EXIST);
    }

    // Update all SEO entries with the same country as the found SEO to is_Main true
    await this.seoRepository
      .createQueryBuilder()
      .update(SeoCountryEntity)
      .set({ is_Main: true })
      .where('country = :country', { country: seo.country })
      .execute();

    // Commit the transaction
    await this.seoRepository.query('COMMIT');
    return seo;
  }

  /**
   * Remove a seo by country code
   *
   * @param {string} country - country code
   * @throws {NotFoundException} - If the seo with the provided country code is not found
   */
  async removeByCountry(country: string): Promise<void> {
    const seo = await this.findOneByCountry(country);
    // await this.seoPages.removeAllPagesByCountry(country);
    await this.seoRepository.remove(seo);
  }

  /**
   * check if country is exist
   *
   * @param {string} country - country code
   * @throws {NotFoundException} - If the seo with the provided country code is not found
   */
  async validateSeoCountryExists(country: string): Promise<void> {
    const exists = await this.seoRepository.findOneBy({
      country,
    });
    if (!isEmpty(exists)) {
      throw new ConflictException(ErrorEnum.SEO_COUNTRY_NOT_EXIST);
    }
  }
}
