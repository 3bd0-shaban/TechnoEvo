import { iBlog } from '@/types/iBlog';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';
const Banner = ({ allBlogs }: { allBlogs: iBlog[] }) => {
  return (
    <div className="rounded-lg bg-white p-5">
      <div className="grid grid-cols-1 gap-1 lg:grid-cols-2">
        <div className="relative">
          {/* {allBlogs[0]?.image && (
                        <Image
                            height={500}
                            width={500}
                            className='w-full h-full object-cover hover:scale-125 duration-150'
                            src={allBlogs[0]?.image.url}
                            alt={allBlogs[0]?.title}
                        />
                    )} */}
          <Link
            href={`/blog/${allBlogs[0].url}`}
            className="absolute bottom-0 left-0 flex h-full w-full flex-col items-start justify-end bg-gradient-to-b from-transparent via-transparent to-black p-5 text-white"
          >
            <p className="py-2 text-xl font-bold">{allBlogs[0]?.blog_Title}</p>
            <p className="text-sm text-gray-100">
              {moment(allBlogs[0]?.createdAt).fromNow()}
            </p>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-1">
          <div className="relative">
            {allBlogs[2]?.thumbnail_Url && (
              <Image
                height={400}
                width={400}
                className="h-full w-full object-cover duration-150 hover:scale-105"
                src={allBlogs[2]?.thumbnail_Url}
                alt={allBlogs[2]?.blog_Title as string}
              />
            )}
            <Link
              href={`/blog/${allBlogs[0].url}`}
              className="absolute bottom-0 left-0 flex h-full w-full flex-col items-start justify-end bg-gradient-to-b from-transparent via-transparent to-black p-5 text-white"
            >
              <p className="py-2 text-lg font-semibold">
                {allBlogs[0]?.blog_Title}
              </p>
              <p className="text-sm">
                {moment(allBlogs[0]?.createdAt).fromNow()}
              </p>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-1">
            {allBlogs?.slice(-2).map((item) => (
              <div key={item.id} className="relative">
                <Image
                  height={300}
                  width={300}
                  className="h-full w-full object-cover"
                  src={item.thumbnail_Url as string}
                  alt={item.blog_Title as string}
                />
                <Link
                  href={`/blog/${item.url}`}
                  className="absolute bottom-0 left-0 flex h-full w-full flex-col items-start justify-end bg-opacity-50 bg-gradient-to-b from-transparent to-black p-5 text-white"
                >
                  <p className="py-2 text-sm font-medium">
                    {allBlogs[0]?.blog_Title}
                  </p>
                  <p className="text-xs">
                    {moment(allBlogs[0]?.createdAt).fromNow()}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
