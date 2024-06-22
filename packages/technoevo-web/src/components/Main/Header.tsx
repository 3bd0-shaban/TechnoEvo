'use client';
import { NavBarLinks } from '@/Constant/HeaderConstant';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { BsList } from 'react-icons/bs';
import logo from '../../../public/Images/icon.png';
const Header: React.FC = () => {
    const [open, setOpen] = useState<Boolean>(false);
    const [prevScrollpos, setPrevScrollpos] = useState<number>(0);
    const [navbarTop, setNavbarTop] = useState<string>('0');

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            if (prevScrollpos > currentScrollPos) {
                setNavbarTop('0');
            } else {
                setNavbarTop('-2rem');
            }
            setPrevScrollpos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollpos]);

    return (
        <>
            <div className='h-20 sm:h-36'>
                <div
                    className='container max-w-full px-0 mb-4 bg-black text-white fixed inset-x-0 top-0 z-30 transition-all'
                    style={{ top: navbarTop }}>
                    <div className='container max-w-full px-0'>
                        <div className='container max-w-[100rem] px-0'>
                            <div className='flex items-center justify-between container max-w-[80rem] text-white h-[2rem] p-3 py-0'>
                                <div className='flex gap-4 px-5'>
                                    {NavBarLinks.map((item, index) => (
                                        <p
                                            className='text-xs font-medium'
                                            key={index}>
                                            {item.title}
                                        </p>
                                    ))}
                                </div>
                                <div>
                                    <button
                                        onClick={() => setOpen(!open)}
                                        className='bg-gray-50 rounded-md border py-0.5 px-1 duration-300 ml-auto text-black
                                     active:bg-gray-100 hover:bg-gray-100 focus:ring focus:ring-gray-200 text-2xl block lg:hidden'>
                                        <BsList />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className='flex justify-between items-center shadow-md bg-white'>
                        <div className='container max-w-[100rem]'>
                            {open ? (
                                <>
                                    <div
                                        className='fixed inset-0 z-10'
                                        onClick={() => setOpen(false)}
                                    />
                                    <div className='absolute w-full inset-x-0 z-20 shadow'>
                                        <div className='flex flex-col px-4 py-5 bg-gray-50 space-y-1 text-black uppercase whitespace-nowrap text-sm md:text-base drop'>
                                            {/* <NavList /> */}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className='hidden lg:flex text-black uppercase container max-w-[80rem] whitespace-nowrap text-sm md:text-base justify-between items-center h-16'>
                                    <div className='flex gap-1 items-center'>
                                        <Image
                                            height={100}
                                            width={200}
                                            src={logo}
                                            alt='technoEvo'
                                        />
                                    </div>
                                    <div></div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Header;
