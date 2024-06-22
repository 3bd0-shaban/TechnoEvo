import { iBlog } from '@/types/iBlog';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';
const Gadgets = ({ allBlogs }: { allBlogs: iBlog[] }) => {
  return (
    <div className="bg-white rounded-lg p-5">
      <div className="flex justify-between py-3">
        <p className="text-lg font-bold uppercase text-slate-800">GADGETS</p>
        <Link href={`/category/`} className="text-gray-500">
          View all
        </Link>
      </div>
      <hr className="mb-4 bg-gray-300 h-0.5" />
      <div className="flex flex-col gap-5">
        <div className="relative">
          {allBlogs[0]?.image && (
            <Image
              height={500}
              width={500}
              className="w-full h-full object-cover hover:scale-125 duration-150"
              src={allBlogs[0]?.image.url}
              alt={allBlogs[0]?.title}
            />
          )}
          <Link
            href={`/blog/${allBlogs[0].url}`}
            className="absolute bottom-0 left-0 p-5 flex flex-col justify-end items-start text-white bg-gradient-to-b from-transparent via-transparent to-black w-full h-full"
          >
            <p className="font-semibold py-2">{allBlogs[0]?.title}</p>
            <p className="text-sm text-gray-100">
              {moment(allBlogs[0]?.createdAt).fromNow()}
            </p>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5">
          {allBlogs?.map((item) => (
            <div key={item._id} className="flex gap-2">
              <div className="w-44 h-24">
                <Image
                  height={300}
                  width={300}
                  className="w-full h-full object-cover"
                  src={item.image.url}
                  alt={item.title}
                />
              </div>
              <Link
                href={`/blog/${item.url}`}
                className="flex flex-col justify-start items-start"
              >
                <p className="font-extrabold mb-2 text-sm">
                  {allBlogs[0]?.title}
                </p>
                <p className="text-xs text-gray-500">
                  {moment(allBlogs[0]?.createdAt).fromNow()}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gadgets;
