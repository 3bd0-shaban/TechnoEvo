import { NewBlogdto } from './dto/Create-Blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Blog } from './schemas/blog.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name)
    private BlogSchema: mongoose.Model<Blog>,
  ) {}

  async GetBlogByURL(url: string): Promise<Blog> {
    const blog = await this.BlogSchema.findOne({ url });

    if (!blog) {
      throw new NotFoundException('No blog founded');
    }
    return blog;
  }

  async GetAllBlogs(): Promise<Blog[]> {
    const blogs = await this.BlogSchema.find();
    return blogs;
  }

  GetRecentlyBlogs() {
    return 'recdntly';
  }

  CreateNewBlog(NewBlogdto: NewBlogdto) {
    return 'success';
  }
}
