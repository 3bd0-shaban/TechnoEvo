import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { BlogService } from './blog.service';
import { NewBlogdto } from './dto/Create-Blog.dto';
import { Blog } from './schemas/blog.schema';

@Controller('blog')
export class BlogController {
  constructor(private readonly BlogService: BlogService) {}
  @Get('')
  async findAll(): Promise<Blog[]> {
    return this.BlogService.GetAllBlogs();
  }
  @Get('recently')
  recentlyBlogs() {
    return this.BlogService.GetRecentlyBlogs();
  }

  @Get(':url')
  fingByURL(@Param('url') url: string) {
    return this.BlogService.GetBlogByURL(url);
  }

  @Post()
  create(@Body() NewBlog: NewBlogdto) {
    return this.BlogService.CreateNewBlog(NewBlog);
  }
  @Put()
  update(
    @Param('url') url: string,
    @Body() NewBlog: NewBlogdto,
  ): Promise<Blog> {
    return null;
    // return this.BlogService.CreateNewBlog(NewBlog);
  }
}
