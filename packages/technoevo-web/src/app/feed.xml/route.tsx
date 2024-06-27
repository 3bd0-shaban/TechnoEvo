import { getAllBlogs } from '@/services/blogApi';
import { iBlog, iBlogResponse } from '@/types/iBlog';
import fs from 'fs';
import RSS from 'rss';
const url = process.env.NEXT_PUBLIC_Client_URL;
export async function GET() {
  const blogData: iBlogResponse = await getAllBlogs(1);
  const feed = new RSS({
    title: 'TechnoEvo',
    description: 'Welcome to this blog posts!',
    site_url: url,
    feed_url: `${url}/rss.xml`,
    image_url: `${url}/logo.jpeg`,
    pubDate: new Date(),
    docs: 'http://example.com/rss/docs.html',
    managingEditor: 'Dylan Greene',
    webMaster: 'Dylan Greene',
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    language: 'en',
  });
  blogData.blogs.forEach((item) => {
    feed.item({
      title: item.blog_Title as string,
      guid: `${url}/blog/${item.url}` as string,
      url: `${url}/blog/${item.url}` as string,
      date: item.createdAt as Date,
      description: item.blog_des as string,
      // categories: item.categories.map(({ name }) => name) || [],
    });
  });
  fs.writeFileSync('./public/rss.xml', feed.xml({ indent: true }));

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  });
  // return feed.xml();
}
