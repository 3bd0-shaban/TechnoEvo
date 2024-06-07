import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { CommonEntity } from '~/common/entity/common.entity';
import { SeoCountryEntity } from '~/modules/seo-country/entities/seo-country.entity';
import { UserEntity } from '~/modules/user/entities/user.entity';
import { SEO_PAGES_ENUM } from '../seo-page.constant';

@Entity({ name: 'seo-pages' })
export class SeoPageEntity extends CommonEntity {
  @Column()
  tag_Title: string;

  @Column()
  tag_Description: string;

  @ManyToOne((type) => SeoCountryEntity, (country) => country.page)
  country: SeoCountryEntity;

  @Column({ enum: SEO_PAGES_ENUM })
  page: SEO_PAGES_ENUM;

  @OneToOne((type) => UserEntity, (admin) => admin.id)
  created_By?: UserEntity;

  @Column()
  canonical_Url: string;

  @Column('simple-array')
  keywoprds: string[];

  @Column({
    type: 'enum',
    enum: ['Optimized', 'Not Optimized'],
  })
  Seo_Status: string;
}
