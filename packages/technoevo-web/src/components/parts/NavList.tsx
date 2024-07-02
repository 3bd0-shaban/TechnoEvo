import { FC, useState } from 'react';
import {
  DashboardNavList,
  HeaderLinksProps,
  NavBarLinks,
} from '../../constants/HeaderConstant';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BiChevronDown } from 'react-icons/bi';
import ChildrenList from './ChildrenList';
import { ListProps } from '@/constants/HeaderChildrens';

interface NavListProps {}

const NavList: FC<NavListProps> = ({}) => {
  const pathname = usePathname();
  const list: HeaderLinksProps[] = pathname.includes('/admin')
    ? DashboardNavList
    : NavBarLinks;

  const NavItem = ({ link }: { link: HeaderLinksProps }) => {
    const [arrowDir, setArrowDir] = useState(0);
    const [showChildren, setShowChildren] = useState<boolean>(false);
    return !link.isDir && link.children?.length !== 0 ? (
      <div className="relative">
        <div
          className="flex h-10 cursor-pointer items-center gap-1.5 hover:text-blue-500"
          onMouseEnter={() => {
            setArrowDir(180), setShowChildren(true);
          }}
          onMouseLeave={() => {
            setArrowDir(0);
            setShowChildren(false);
          }}
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
        {showChildren && (
          <ChildrenList
            list={link.children as ListProps[]}
            onHover={(value) => setShowChildren(value)}
          />
        )}
      </div>
    ) : (
      <Link
        href={link.linkDir as string}
        className={`hover:text-blue-500 ${pathname === link.linkDir ? 'text-blue-500' : ''}`}
      >
        {link.title}
      </Link>
    );
  };

  return (
    <>
      {list.map((link) => (
        <div key={link.id} className="text-sm font-semibold text-gray-700">
          <NavItem link={link} />
        </div>
      ))}
    </>
  );
};

export default NavList;
