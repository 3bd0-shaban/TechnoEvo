import { FC, useState } from 'react';
import { NavBarLinks } from '../../constants/HeaderConstant';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BiChevronDown } from 'react-icons/bi';

interface NavListProps {}

const NavList: FC<NavListProps> = ({}) => {
  const pathname = usePathname();
  const [arrowDir, setArrowDir] = useState(0);

  return (
    <>
      {NavBarLinks.map((link) => (
        <div key={link.id} className="font-semibold text-gray-700 text-sm">
          {!link.isDir ? (
            <div
              className="flex items-center gap-1.5 hover:text-blue-500 cursor-pointer"
              onMouseEnter={() => setArrowDir(180)}
              onMouseLeave={() => setArrowDir(0)}
            >
              <p>{link.title}</p>
              <BiChevronDown
                style={{
                  transition: 'transform 0.3s ease',
                  transform: `rotate(${arrowDir}deg)`,
                }}
                size={22}
              />
            </div>
          ) : (
            <Link
              href={link.linkDir}
              className={`hover:text-blue-500 ${pathname === link.linkDir ? 'text-blue-500' : ''}`}
            >
              {link.title}
            </Link>
          )}
        </div>
      ))}
    </>
  );
};

export default NavList;
