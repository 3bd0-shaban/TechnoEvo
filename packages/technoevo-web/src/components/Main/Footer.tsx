import { iBlog } from '@/types/iBlog';
import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment';

const categories = [
    { _id: 'dkc', categoryName: 'Gadget' },
    { _id: 'e;l', categoryName: 'Reviews' },
    { _id: 'elr', categoryName: 'Laptops' },
];
const tages = [
    { _id: 'cmf', tagName: 'Gadget' },
    { _id: 'lds', tagName: 'Reviews' },
    { _id: 'dlck', tagName: 'Laptops' },
];
const links = [
    { _id: 'ldksj', link: '/home', title: 'Home' },
    { _id: 'djkjh', link: '/about', title: 'About Us' },
    { _id: 'ff', link: '/contact', title: 'Contact us' },
];
const Footer = ({ allBlogs }: { allBlogs: iBlog[] }) => {
    const Blogs = ({ title }: { title: string }) => {
        return (
            <div className='flex flex-col gap-y-3'>
                <p className='uppercase font-semibold'>{title}</p>
                <div className='grid grid-cols-1gap-5'>
                    {allBlogs?.map(item => (
                        <div
                            key={item._id}
                            className='flex gap-2 my-2'>
                            <Image
                                height={300}
                                width={300}
                                className='h-[6rem] w-[10rem] object-cover'
                                src={item.image.url}
                                alt={item.title}
                            />
                            <Link
                                href={`/blog/${item.url}`}
                                className='flex flex-col justify-start items-start'>
                                <p className='font-bold text-white mb-2 text-sm'>
                                    {item.title}
                                </p>
                                <p className='font-light text-sm text-gray-400'>
                                    {moment(item.createdAt).fromNow()}
                                </p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className='bg-[#16161A] text-slate-200 container px-0 max-w-full'>
            <div className='flex justify-center items-center py-5'>
                <div className='container p-5 max-w-7xl '>
                    <div className='grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-5'>
                        <div className='flex flex-col gap-y-3'>
                            <p className='uppercase font-semibold'>
                                Categories
                            </p>
                            {categories.map(item => (
                                <div
                                    key={item._id}
                                    className='flex justify-between'>
                                    <p>{item.categoryName}</p>
                                    <p>(9)</p>
                                </div>
                            ))}
                            <p className='uppercase mt-3 font-semibold'>
                                Main Tages
                            </p>
                            <div className='grid grid-cols-3 gap-3'>
                                {tages.map(item => (
                                    <Link
                                        key={item._id}
                                        href={item.tagName}
                                        className='bg-[#1D1D21] rounded-md text-center hover:text-orange-600 p-3'>
                                        <p>{item.tagName}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <Blogs title='LATEST POSTS' />
                        <Blogs title='Popular posts' />
                    </div>
                    <hr className='mt-10' />
                    <div className='py-8 flex justify-between'>
                        <div></div>
                        <div>
                            <p>About us</p>
                            <p>
                                {`Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's.`}
                            </p>
                        </div>
                        <div></div>
                    </div>
                    <p></p>
                </div>
            </div>
            <div className='bg-[#09090A] py-5'>
                <div className='container max-w-7xl flex flex-col md:flex-row justify-between'>
                    <p>
                        @ CopyWrite 2023, All Rights Reserved , Develpoed by
                        AbdElrahman Shaban
                    </p>
                    <div className='flex gap-3'>
                        {links.map(item => (
                            <Link
                                href={item.link}
                                key={item._id}
                                className='hover:underline hover:text-orange-600'>
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
