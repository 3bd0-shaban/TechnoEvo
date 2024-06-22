import { CommonEntity } from '~/common/entity/common.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { UserEntity } from '~/modules/user/entities/user.entity';

@Entity({ name: 'logs' })
export class LogEntity extends CommonEntity {
  @Column()
  content: string;

  @ManyToOne(() => UserEntity, (admin) => admin.logs)
  @JoinColumn()
  admin: UserEntity;
}
