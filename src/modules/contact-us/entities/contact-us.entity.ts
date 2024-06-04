import { Column, Entity } from 'typeorm';
import { CommonEntity } from '~/common/entity/common.entity';

@Entity({ name: 'contact-us' })
export class ContactUsEntity extends CommonEntity {
  @Column({ length: 255 })
  fullname: string;

  @Column()
  email: string;

  @Column({ length: 255 })
  phone: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ nullable: true, length: 255 })
  subject: string;
}
