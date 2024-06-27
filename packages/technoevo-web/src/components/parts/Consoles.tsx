import { iBlog } from '@/types/iBlog';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';
const Consoles = ({ allBlogs }: { allBlogs: iBlog[] }) => {
  return (
    <div className="rounded-lg bg-white p-5">
      <div className="flex justify-between py-3">
        <p className="text-lg font-bold">Reviews</p>
        <Link href={`/category/`} className="text-gray-500">
          View all
        </Link>
      </div>
      <hr className="mb-4 h-0.5 bg-gray-300" />
      <div className="grid grid-cols-2 gap-5">
        {allBlogs?.map((item) => (
          <div key={item.id} className="flex flex-col gap-2">
            <Image
              height={300}
              width={300}
              draggable={false}
              className="h-[15rem] w-full object-cover"
              src={item.thumbnail_Url as string}
              alt={item.blog_Title as string}
            />
            <Link
              href={`/blog/${item.url}`}
              className="flex flex-col items-start justify-start"
            >
              <p className="mb-2 text-sm font-extrabold">
                {allBlogs[0]?.blog_Title}
              </p>
            </Link>
            <p className="text-xs text-gray-500">
              {moment(allBlogs[0]?.createdAt).fromNow()}
            </p>
            {/* <div
                            className='ellipse-5 text-xs'
                            dangerouslySetInnerHTML={{ __html: item?.content }}
                        /> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Consoles;
