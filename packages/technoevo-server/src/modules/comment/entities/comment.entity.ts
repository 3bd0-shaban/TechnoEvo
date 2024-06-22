import { Entity, Column, JoinTable, ManyToOne } from 'typeorm';
import { CommonEntity } from '~/common/entity/common.entity';
import { BlogEntity } from '~/modules/blog/entities/blog.entity';
import { UserEntity } from '~/modules/user/entities/user.entity';
import { ReplyEntity } from '~/modules/reply/entities/reply.entity';

@Entity({ name: 'comments' })
export class CommentEntity extends CommonEntity {
  @Column()
  comment: string;

  @Column('int', { default: 0 })
  likes?: string;

  @Column('int', { default: 0 })
  dislikes?: string;

  @ManyToOne((type) => ReplyEntity, (reply) => reply.comment)
  replies?: string;

  @ManyToOne((type) => UserEntity, (user) => user.comments)
  @JoinTable()
  user: UserEntity;

  @ManyToOne((type) => BlogEntity, (blog) => blog.comments)
  @JoinTable()
  blog: BlogEntity;
}
