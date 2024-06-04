import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactUsDto } from './dto/create-contact-us.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactUsEntity } from './entities/contact-us.entity';
import { ErrorEnum } from '~/constants/error-code.constant';
import { PaginationArgs } from '~/shared/dto/args/pagination-query.args';

@Injectable()
export class ContactUsService {
  constructor(
    @InjectRepository(ContactUsEntity)
    private readonly contactUsRepository: Repository<ContactUsEntity>,
  ) {}

  /**
   * Create New contactUs
   *
   * @param {CreatecontactUsDTO} inputs - enterted inputs
   * @returns {Promise<ContactUsEntity>} - Password match result
   * @memberof contactUsService
   */
  async create(inputs: CreateContactUsDto): Promise<ContactUsEntity> {
    const contactUsDoc = this.contactUsRepository.create({
      ...inputs,
    });
    return await contactUsDoc.save();
  }

  /**
   * Get All contactUss with pagination
   *
   * @param {PaginationArgs} pagination - pagination inputs
   * @returns {Promise<{ contactUss: ContactUsEntity[]; results: number; total: number }>} - Paginated contactUss
   * @memberof contactUsService
   */
  async findAll(pagination: PaginationArgs): Promise<{
    contactUss: ContactUsEntity[];
    results: number;
    total: number;
  }> {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;
    const [contactUss, total] = await this.contactUsRepository.findAndCount({
      take: limit,
      skip,
    });
    return { total, results: contactUss.length, contactUss };
  }

  /**
   * Find a contactUs by ID
   *
   * @param {number} id - contactUs ID
   * @returns {Promise<ContactUsEntity>} - The found contactUs
   * @throws {NotFoundException} - If the contactUs with the provided ID is not found
   */
  async findOne(id: number): Promise<ContactUsEntity> {
    const contactUs = await this.contactUsRepository.findOneBy({ id });
    if (!contactUs) {
      throw new NotFoundException(ErrorEnum.COMMENT_NOT_EXIST);
    }
    return contactUs;
  }

  /**
   * Remove a contactUs by ID
   *
   * @param {number} contactUsID - contactUs ID
   * @throws {NotFoundException} - If the contactUs with the provided ID is not found
   */
  async removeById(contactUsID: number): Promise<void> {
    const contactUs = await this.findOne(contactUsID);
    await this.contactUsRepository.remove(contactUs);
  }
}
