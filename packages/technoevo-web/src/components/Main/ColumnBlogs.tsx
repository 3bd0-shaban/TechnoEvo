import Image from 'next/image';
import { FC } from 'react';
import { iBlog } from '@/types/iBlog';
import Link from 'next/link';
import moment from 'moment';

interface HomeBlogsProps {
  blogs: iBlog[];
}

const ColumnBlogs: FC<HomeBlogsProps> = ({ blogs }) => {
  return (
    <>
      <div className="flex flex-col gap-5 rounded-xl overflow-hidden my-20">
        {blogs?.map((blog) => (
          <Link
            href={`/blog/${blog.url}`}
            key={blog.id}
            className="bg-white shadow shadow-gray-200 rounded-xl"
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_Server_APi}/uploads/${blog.thumbnail_Url}`}
              height={800}
              width={500}
              alt={blog.blog_Title as string}
            />
            <div className="flex flex-col gap-2 font-medium p-5">
              <div className="flex gap-2 items-center">
                {blog?.categories?.slice(0, 3).map((item) => (
                  <div className="text-xl font-light text-black" key={item.id}>
                    {item.category}
                  </div>
                ))}
              </div>
              <p className="font-semibold text-lg text-black">
                {blog.blog_Title}
              </p>
              <p className="text-light text-gray-400 ellipsis-2">
                {blog.blog_des}
              </p>
            </div>
            <hr />
            <div className="flex justify-between p-5 items-center text-xs font-medium text-gray-400">
              <p className="uppercase">{moment(blog.createdAt).fromNow()}</p>
              <p>{blog.likes} Like</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ColumnBlogs;
