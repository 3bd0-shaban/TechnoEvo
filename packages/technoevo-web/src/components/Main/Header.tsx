'use client';
import Image from 'next/image';
import React from 'react';
import logo from '../../../public/Images/icon.png';
import NavList from '../parts/NavList';
import { BsMoon, BsSearch } from 'react-icons/bs';
import { Session } from 'next-auth';
import Link from 'next/link';
const Header: React.FC<{ sesssion: Session | null }> = ({ sesssion }) => {
  return (
    <div className="py-20">
      <div className="container absolute inset-x-0 top-20 h-20 max-w-[105rem] rounded-xl bg-white px-5 shadow shadow-slate-200">
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center gap-1">
            <Image
              height={100}
              width={200}
              className="w-32"
              src={logo}
              alt="technoEvo"
            />
            <div className="flex items-center gap-3 px-5">
              <NavList />
            </div>
          </div>
          <div className="flex max-w-[50%] items-center justify-between gap-5 divide-x-[1px] divide-gray-300">
            <p className="text-sm text-gray-400">
              {sesssion?.role && <Link href="/admin/">Dashboard</Link>}
              {!sesssion && (
                <Link
                  href="/auth/signin"
                  className="font-medium text-red-500 underline"
                >
                  Login
                </Link>
              )}
            </p>
            <div className="flex items-center gap-5 pl-5">
              <p>Featutres</p>
              <BsMoon />
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                <BsSearch />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
