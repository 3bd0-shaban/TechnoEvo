import { iBlog } from '@/types/iBlog';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';
const LatestNews = ({ allBlogs }: { allBlogs: iBlog[] }) => {
  return (
    <div className="bg-white rounded-lg p-5">
      <div className="flex justify-between py-3">
        <p className="text-lg font-bold uppercase text-slate-800">
          Latest news
        </p>
        <Link href={`/category/`} className="text-gray-500">
          View all
        </Link>
      </div>
      <hr className="mb-4 bg-gray-300 h-0.5" />

      <div className="grid grid-cols-1 gap-5">
        {allBlogs?.map((item) => (
          <div key={item?.id} className="flex gap-2">
            {/* <Image
              height={300}
              width={300}
              className="h-[10rem] w-[30rem] object-cover"
              src={`${process.env.NEXT_PUNLIC_API_KEY}/uploads/${item.thumbnail_url}`}
              alt={item.blog_Title as string}
            /> */}
            <Link
              href={`/blog/${item.blog_Title}`}
              className="flex flex-col justify-start items-start"
            >
              <p className="font-bold text-gray-900 mb-2 text-xl">
                {allBlogs[0]?.blog_Title}
              </p>
              <p className="font-medium text-gray-500">
                {moment(allBlogs[0]?.createdAt).fromNow()}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
