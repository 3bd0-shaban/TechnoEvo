import { iBlog } from '@/models';
import { getAllBlogs } from '@/services/blogApi'
 const url = process.env.NEXT_PUBLIC_Client_URL
export default async function sitemap() {
    const blogData:iBlog[] = await getAllBlogs();

    const posts = blogData.map((item) => ({
            url: `${url}/blog/${item.url}`,
            lastModified:item.createdAt
    }));
    return [
         ...posts,
    ];
}