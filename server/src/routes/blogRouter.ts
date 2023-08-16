import upload from '../utils/multer';
import express from 'express';
import {
  GetBlog,
  GetBlogById,
  NewBlog,
  GetRecentBlog,
} from '../controllers/BlogController';
const router = express.Router();

router.get('/', GetBlog);
router.get('/id/:url', GetBlogById);
router.get('/recent', GetRecentBlog);
router.post('/', upload.single('image'), NewBlog);
export default router;
