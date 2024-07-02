import { ListProps } from '@/constants/HeaderChildrens';
import Link from 'next/link';
import { FC } from 'react';

interface ChildrenListProps {
  list: ListProps[];
  onHover: (value: boolean) => void;
}

const ChildrenList: FC<ChildrenListProps> = ({ list, onHover }) => {
  return (
    <div
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className="absolute left-0 top-10 w-60 rounded-lg bg-white shadow-[.2px_.2px_20px_1px] shadow-gray-200"
    >
      <div className="flex flex-col p-2">
        {list?.map((children) => (
          <Link
            href={children.linkDir}
            key={children.id}
            className="w-full rounded-md p-3 hover:bg-gray-100"
          >
            {children.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChildrenList;
