import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { CommonEntity } from '~/common/entity/common.entity';
import { BannerEntity } from '~/modules/banner/entities/banner.entity';
import { CategoryEntity } from '~/modules/category/entities/category.entity';
import { CommentEntity } from '~/modules/comment/entities/comment.entity';
import { ReplyEntity } from '~/modules/reply/entities/reply.entity';

@Entity({ name: 'blogs' })
export class BlogEntity extends CommonEntity {
  @Column()
  blog_Title: string;

  @Column()
  blog_des: string;

  @Column('int', { default: 0 })
  likes?: string;

  @Column('int', { default: 0 })
  dislikes?: string;

  @Column()
  thumbnail_Url: string;

  @Column('boolean', { default: true })
  is_Active?: string;

  @Column('boolean', { default: true })
  is_Commenting?: string;

  @OneToOne((type) => BannerEntity, (banner) => banner.blog)
  banner: BannerEntity;

  @ManyToMany((type) => CategoryEntity, (genre) => genre.blogs)
  @JoinTable()
  categories: CategoryEntity[];

  @OneToMany((type) => CommentEntity, (comment) => comment.blog)
  comments: CommentEntity[];

  @OneToMany((type) => ReplyEntity, (reply) => reply.user)
  replies: ReplyEntity[];
}
