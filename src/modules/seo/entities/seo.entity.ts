import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '~/common/entity/common.entity';
import { UserEntity } from '~/modules/user/entities/user.entity';

@Entity({ name: 'seos' })
export class SeoEntity extends CommonEntity {
  @Column()
  tag_Title: string;

  @Column()
  tag_Description: string;

  @Column()
  country: string;

  @Column()
  page: string;

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

  @Column('boolean', { default: true })
  is_Active?: boolean;

  @Column('boolean', { default: false })
  is_Main?: boolean;
}
