import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { CommonEntity } from '~/common/entity/common.entity';
import { BlogEntity } from '~/modules/blog/entities/blog.entity';
import { UserEntity } from '~/modules/user/entities/user.entity';

@Entity({ name: 'banners' })
export class BannerEntity extends CommonEntity {
  @OneToOne((type) => BlogEntity, (blog) => blog.banner)
  @JoinColumn()
  blog: BlogEntity;

  @ManyToOne((type) => UserEntity, (user) => user.banners)
  @JoinColumn()
  created_By: UserEntity;
}