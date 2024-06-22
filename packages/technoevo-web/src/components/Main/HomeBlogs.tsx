'use client';
import ColumnBlogs from '@/components/Main/ColumnBlogs';
import { useGetAllBlogsQuery } from '@/services/Apis/BlogApi';
import { iBlog } from '@/types/iBlog';
import { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';

export default function HomeBlogs({
  intitalBlogs,
  totalCount,
}: {
  intitalBlogs: iBlog[];
  totalCount: number;
}) {
  const [blogs, setBlogs] = useState<iBlog[]>(intitalBlogs);
  const [currentPage, setCurrentPage] = useState<number>(2);
  const { data, refetch, isFetching } = useGetAllBlogsQuery({
    page: currentPage,
    limit: 24,
  });
  const { blogs: retunredBlogs } = data || {};
  const fetchBlogs = async (page: number) => {
    try {
      refetch();
      setBlogs((prevBlogs) => [...prevBlogs, ...(retunredBlogs as iBlog[])]);
      setCurrentPage(page);
    } catch (error) {}
  };

  // Calculate columns and display blogs
  const blogsPerColumn = Math.ceil(blogs.length / 4);
  const columns = Array.from({ length: 4 }, (_, index) =>
    blogs.slice(index * blogsPerColumn, (index + 1) * blogsPerColumn),
  );

  return (
    <>
      <div className="grid grid-cols-4 gap-8 ">
        {columns.map((columnBlogs, index) => (
          <ColumnBlogs key={index} blogs={columnBlogs} />
        ))}
      </div>
      {totalCount < blogs.length && (
        <div className="flex w-full justify-center">
          <button
            onClick={() => fetchBlogs(currentPage + 1)}
            disabled={isFetching}
            className="my-5 hover:text-blue-500 group-hover:bg-blue-500 group-hover:text-white"
          >
            <div className="flex gap-2 items-center font-medium text-sm">
              <p>Load More.</p>
              <span className="group flex items-center w-8 h-8 bg-white shadow justify-center rounded-full">
                <BiChevronDown />
              </span>
            </div>
          </button>
        </div>
      )}
    </>
  );
}
