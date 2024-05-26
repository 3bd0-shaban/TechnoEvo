import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany } from 'typeorm';
import { CommonEntity } from '~/common/entity/common.entity';
import { LogEntity } from '~/modules/log/entities/log.entity';
import { USER_ROLES_ENUMS } from '../user.constant';
import { CommentEntity } from '~/modules/comment/entities/comment.entity';

@Entity({ name: 'users' })
export class UserEntity extends CommonEntity {
  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Exclude()
  @Column({ select: false })
  password: string;

  @Column()
  otp: string;

  @Column({
    type: 'enum',
    enum: USER_ROLES_ENUMS,
    default: USER_ROLES_ENUMS.User,
  })
  role: string;

  @OneToMany((type) => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];

  @OneToMany(() => LogEntity, (log) => log.id)
  logs: LogEntity;

  @Column('boolean', { default: false })
  is_Verified: boolean;
}
