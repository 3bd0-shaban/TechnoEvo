import { iBlog } from '@/types/iBlog';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';
const Reviews = ({ allBlogs }: { allBlogs: iBlog[] }) => {
    return (
        <div className='bg-white rounded-lg p-5'>
            <div className='flex justify-between py-3'>
                <p className='text-lg font-bold'>Reviews</p>
                <Link
                    href={`/category/`}
                    className='text-gray-500'>
                    View all
                </Link>
            </div>
            <hr className='mb-4 bg-gray-300 h-0.5' />
            <div className='grid grid-cols-3 gap-5'>
                {allBlogs?.map(item => (
                    <div
                        key={item._id}
                        className='flex flex-col gap-2'>
                        <div className='h-[8rem] w-full'>
                            <Image
                                height={300}
                                width={300}
                                draggable={false}
                                className='w-full h-full object-cover'
                                src={item.image.url}
                                alt={item.title}
                            />
                        </div>
                        <Link
                            href={`/blog/${item.url}`}
                            className='flex flex-col justify-start items-start'>
                            <p className='font-extrabold mb-2 text-sm'>
                                {allBlogs[0]?.title}
                            </p>
                            <p className='text-xs text-gray-500'>
                                {moment(allBlogs[0]?.createdAt).fromNow()}
                            </p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reviews;
