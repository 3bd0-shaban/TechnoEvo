import { getAllBlogs } from '@/services/blogApi';
import { iBlogResponse } from '@/types/iBlog';
import HomeBlogs from '../../components/Main/HomeBlogs';

export default async function Home() {
  const allBlogs: iBlogResponse = await getAllBlogs(1);
  const { blogs, totalCount } = allBlogs;

  return <HomeBlogs intitalBlogs={blogs} totalCount={totalCount} />;
}
