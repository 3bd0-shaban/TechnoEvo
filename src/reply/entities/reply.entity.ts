import { Entity, Column, JoinTable, ManyToOne } from 'typeorm';
import { CommonEntity } from '~/common/entity/common.entity';
import { CommentEntity } from '~/modules/comment/entities/comment.entity';
import { UserEntity } from '~/modules/user/entities/user.entity';

@Entity({ name: 'replies' })
export class ReplyEntity extends CommonEntity {
  @Column()
  reply: string;

  @Column('int', { default: 0 })
  likes?: string;

  @Column('int', { default: 0 })
  dislikes?: string;

  @ManyToOne((type) => UserEntity, (user) => user.comments)
  @JoinTable()
  user: UserEntity;

  @ManyToOne((type) => CommentEntity, (comment) => comment.replies)
  @JoinTable()
  comment: CommentEntity;
}
