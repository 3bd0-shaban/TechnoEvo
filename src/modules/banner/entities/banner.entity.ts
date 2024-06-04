import { Entity, Column, JoinTable, ManyToOne, OneToOne } from 'typeorm';
import { CommonEntity } from '~/common/entity/common.entity';
import { BlogEntity } from '~/modules/blog/entities/blog.entity';
import { UserEntity } from '~/modules/user/entities/user.entity';
import { ReplyEntity } from '~/modules/reply/entities/reply.entity';

@Entity({ name: 'banners' })
export class BannerEntity extends CommonEntity {
  @OneToOne((type) => BlogEntity, (blog) => blog.comments)
  @JoinTable()
  blog: BlogEntity;
}
