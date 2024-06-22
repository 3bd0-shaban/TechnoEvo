import type { Metadata } from 'next';
import Link from 'next/link';
import { RecentData } from '@/components/parts/RecentBlogs';
import { iBlog, iBlogResponse } from '@/types/iBlog';
import { getAllBlogs } from '@/services/blogApi';
import Banner from '@/components/parts/Banner';
import WorldNews from '@/components/parts/WorldNews';
import Reviews from '@/components/parts/Reviews';
import Gadgets from '@/components/parts/Gadgets';
import Laptops from '@/components/parts/Laptops';
import LatestNews from '@/components/parts/LatestNews';
import Consoles from '@/components/parts/Consoles';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { blogs } = await RecentData();
  const allBlogs: iBlogResponse = await getAllBlogs();

  // console.log('data', JSON.stringify(data))
  return (
    <>
      <div className="container p-5 max-w-7xl min-h-screen">
        {/* <Banner allBlogs={allBlogs.blogs} /> */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="col-span-2">
            <div className="flex flex-col gap-5 my-5">
              {/* <WorldNews allBlogs={allBlogs.blogs} /> */}
              <Reviews allBlogs={allBlogs.blogs} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* <Gadgets allBlogs={allBlogs.blogs} /> */}
                {/* <Laptops allBlogs={allBlogs.blogs} /> */}
              </div>
              <LatestNews allBlogs={allBlogs.blogs} />
              <Consoles allBlogs={allBlogs.blogs} />
            </div>
            {children}
          </div>
          <div className="sticky">
            {blogs?.map((item) => (
              <div key={item._id} className="py-1">
                <Link
                  href={`/blog/${item.url}`}
                  className="text-start text-sm text-ellipsis font-semibold hover:underline"
                >
                  {item.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
