import expressAsyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { iBlog } from 'types/iBlog';
import Blog from '../models/blog';
import { handleUpload } from '../utils/cloudinary';

export const NewBlog = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { title, content } = req.body as iBlog;
    if (!req.file) {
      res.status(400);
      throw new Error('No Image seleced');
    }
    const result = await handleUpload(req, 'TechnoEvo/blogs');
    await new Blog({
      title,
      content,
      url: title.replace(/\s+/g, '-'),
      image: {
        public_id: result.public_id,
        url: result.url,
      },
    })
      .save()
      .then((blog) => {
        return res.json({
          message: 'Product uploaded successfully',
          status: 'success',
          blog,
        });
      })
      .catch((error: any) => {
        res.status(500);
        throw new Error(error);
      });
  },
);
export const GetBlog = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const limit = Number(req.query.limit) || 5;
    const page = Number(req.query.page) || 1;
    const blogs: iBlog[] = await Blog.find()
      .limit(limit)
      .skip(limit * (page - 1));
    const totalCount = await Blog.countDocuments();
    res.json({
      blogs,
      results: blogs.length,
      totalCount,
    });
  },
);
export const GetRecentBlog = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const posts: iBlog[] = await Blog.find().select('title');
    res.json(posts);
  },
);
export const GetBlogById = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const post = await Blog.findOne({ url: req.params.url });
    res.json(post);
  },
);
