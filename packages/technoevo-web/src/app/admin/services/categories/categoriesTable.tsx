'use client';

import React, { FC } from 'react';
import moment from 'moment';
import { toast } from 'react-hot-toast';
import { BsSearch } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import {
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
} from '@/services/Apis/categoryApi';
import { ImSpinner3, ImSpinner7 } from 'react-icons/im';

interface TableProps {}
const CategoriesTable: FC<TableProps> = ({}) => {
  const { data, isFetching } = useGetAllCategoriesQuery({ page: 1, limit: 5 });
  const { categories } = data || {};
  const { mutateAsync: updateCategory, isPending: Updating } =
    useUpdateCategoryMutation();
  const { mutateAsync: DeleteCategory, isPending: Deleteing } =
    useDeleteCategoryMutation();

  const DeleteCategoryHandler = (id: number) => {
    DeleteCategory(id)
      .then(() => {
        toast.success('Category Deleted successfully');
      })
      .catch((err: any) => {
        toast.error(err?.data?.message);
      });
  };

  return (
    <div className="relative my-5 overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex justify-between px-5">
        <div></div>
        <div className="relative my-5">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <BsSearch />
          </div>
          <input
            type="text"
            className="w-80 rounded-lg border border-blue-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Search for users"
          />
        </div>
      </div>
      <table className="w-full text-left text-sm text-gray-500">
        <thead className="whitespace-nowrap bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th scope="col" className="p-4">
              #
            </th>
            <th scope="col" className="px-6 py-3">
              Category Name
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              action
            </th>
          </tr>
        </thead>
        {isFetching ? (
          <div className="flex w-full items-center justify-center">
            <span className="flex animate-spin items-center justify-center">
              <ImSpinner7 />
            </span>
          </div>
        ) : (
          <tbody>
            {categories?.map((item, index) => (
              <tr
                key={item.id}
                className="whitespace-nowrap border-b bg-white hover:bg-gray-50"
              >
                <td className="w-4 p-4">{item.id}</td>
                <td className="px-6 py-4">{item?.category}</td>
                <td className="px-6 py-4">
                  <p>{moment(item.createdAt).fromNow()}</p>
                </td>
                <td className="px-6 py-4">
                  <button
                    type="button"
                    aria-label="Confirm Doctor"
                    onClick={() => DeleteCategoryHandler(item.id as number)}
                    className="rounded-md border border-sky-200 bg-sky-100 px-7 py-1 text-sky-400 shadow-md shadow-sky-200 duration-200 active:scale-95 active:bg-sky-200"
                  >
                    {Deleteing ? (
                      <span className="flex w-full items-center justify-center gap-2">
                        <span className="flex items-center justify-center">
                          <ImSpinner3 size={22} />
                        </span>
                        <p className="font-semibold">Loading ....</p>
                      </span>
                    ) : (
                      <span className="flex w-full items-center justify-center gap-2">
                        <MdDelete size={22} />
                        <p className="font-semibold">Delete</p>
                      </span>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default CategoriesTable;
