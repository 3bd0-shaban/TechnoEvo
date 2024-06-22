import { iBlog } from '@/types/iBlog';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';
const Banner = ({ allBlogs }: { allBlogs: iBlog[] }) => {
    return (
        <div className='bg-white rounded-lg p-5'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-1'>
                <div className='relative'>
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
                        className='absolute bottom-0 left-0 p-5 flex flex-col justify-end items-start text-white bg-gradient-to-b from-transparent via-transparent to-black w-full h-full'>
                        <p className='font-bold text-xl py-2'>
                            {allBlogs[0]?.title}
                        </p>
                        <p className='text-sm text-gray-100'>
                            {moment(allBlogs[0]?.createdAt).fromNow()}
                        </p>
                    </Link>
                </div>
                <div className='grid grid-cols-1 gap-1'>
                    <div className='relative'>
                        {allBlogs[2]?.image && (
                            <Image
                                height={400}
                                width={400}
                                className='w-full h-full object-cover hover:scale-105 duration-150'
                                src={allBlogs[2]?.image.url}
                                alt={allBlogs[2]?.title}
                            />
                        )}
                        <Link
                            href={`/blog/${allBlogs[0].url}`}
                            className='absolute bottom-0 left-0 p-5 flex flex-col justify-end items-start text-white bg-gradient-to-b from-transparent via-transparent to-black w-full h-full'>
                            <p className='font-semibold text-lg py-2'>
                                {allBlogs[0]?.title}
                            </p>
                            <p className='text-sm'>
                                {moment(allBlogs[0]?.createdAt).fromNow()}
                            </p>
                        </Link>
                    </div>
                    <div className='grid grid-cols-2 gap-1'>
                        {allBlogs?.slice(-2).map(item => (
                            <div
                                key={item._id}
                                className='relative'>
                                <Image
                                    height={300}
                                    width={300}
                                    className='w-full h-full object-cover'
                                    src={item.image.url}
                                    alt={item.title}
                                />
                                <Link
                                    href={`/blog/${item.url}`}
                                    className='absolute bottom-0 left-0 p-5 flex flex-col justify-end items-start text-white bg-gradient-to-b from-transparent to-black bg-opacity-50 w-full h-full'>
                                    <p className='font-medium text-sm py-2'>
                                        {allBlogs[0]?.title}
                                    </p>
                                    <p className='text-xs'>
                                        {moment(
                                            allBlogs[0]?.createdAt
                                        ).fromNow()}
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
