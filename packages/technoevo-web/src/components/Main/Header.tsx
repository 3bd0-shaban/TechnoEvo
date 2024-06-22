'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import logo from '../../../public/Images/icon.png';
import NavList from '../parts/NavList';
import { BsMoon, BsSearch } from 'react-icons/bs';
const Header: React.FC = () => {
  const [open, setOpen] = useState<Boolean>(false);

  return (
    <div className="py-20">
      <div className="h-20 container max-w-[105rem] absolute inset-x-0 top-20 rounded-xl px-5 shadow shadow-slate-200 bg-white">
        <div className="flex justify-between items-center  h-full">
          <div className="flex gap-1 items-center">
            <Image
              height={100}
              width={200}
              className="w-32"
              src={logo}
              alt="technoEvo"
            />
            <div className="px-5 flex items-center gap-3">
              <NavList />
            </div>
          </div>
          <div className="flex justify-between items-center max-w-[50%] gap-5 divide-x-[1px] divide-gray-300">
            <p className="text-gray-400 text-sm">
              Wel{`come to Tomorrow's Tech Wonders!`}
            </p>
            <div className="flex items-center pl-5 gap-5">
              <p>Featutres</p>
              <BsMoon />
              <span className="h-10 w-10 rounded-lg bg-gray-100 items-center justify-center flex ">
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
