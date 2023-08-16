'use client';

import { NavBarLinks } from "@/Constant/HeaderConstant";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const NavList = () => {
    const pathname = usePathname();
    // console.log(pathname)
    return (
        <>
            {NavBarLinks.map((item, index) => {
                return (
                    < Link
                        key={index}
                        href={item.linkDir}
                        draggable={false}
                        className={`hover:text-blue-600 hover:underline px-3 md:px-5 py-2 ${(pathname === item.linkDir) && ('text-blue-600 underline')}}`
                        } >
                        {item.title}
                    </Link>
                )
            })}

        </>
    )
}
export default NavList