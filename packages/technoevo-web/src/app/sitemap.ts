import { getAllBlogs } from '@/services/blogApi';
import { iBlog, iBlogResponse } from '@/types/iBlog';
const url = process.env.NEXT_PUBLIC_Client_URL;
export default async function sitemap() {
  const blogData: iBlogResponse = await getAllBlogs(1);

  const posts = blogData.blogs.map((item) => ({
    url: `${url}/blog/${item.url}`,
    lastModified: item.createdAt,
  }));
  return [...posts];
}
