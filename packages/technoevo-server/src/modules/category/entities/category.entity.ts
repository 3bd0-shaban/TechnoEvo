import { CommonEntity } from '~/common/entity/common.entity';
import { Entity, Column, ManyToMany } from 'typeorm';
import { BlogEntity } from '~/modules/blog/entities/blog.entity';

@Entity({ name: 'categories' })
export class CategoryEntity extends CommonEntity {
  @Column()
  category: string;

  @ManyToMany((type) => CategoryEntity, (category) => category.blogs)
  blogs: BlogEntity[];
}
