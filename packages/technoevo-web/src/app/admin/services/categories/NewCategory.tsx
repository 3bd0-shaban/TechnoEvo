'use client';
import React, { FC } from 'react';
import { ImSpinner9 } from 'react-icons/im';
import { toast } from 'react-hot-toast';
import { getError } from '@/helpers/getError';
import { useForm } from 'react-hook-form';
import { useAddNewCategoryMutation } from '@/services/Apis/categoryApi';
import { joiResolver } from '@hookform/resolvers/joi';
import { blogValidations } from '@/validations/blog.validate';
import { iCategory } from '@/types/iCategory';
import { categoryValidations } from '@/validations/category.validate';

interface EditorProps {}

const NewCategory: FC<EditorProps> = ({}) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<iCategory>({
    resolver: joiResolver(categoryValidations.createCategory),
  });
  const { mutateAsync, isPending } = useAddNewCategoryMutation();
  const onSubmit = async (data: iCategory) => {
    await mutateAsync(data)
      .then(() => {
        toast.success('blog added successfully');
        reset();
      })
      .catch((error) => {
        toast.error(getError(error));
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-y-4">
        <div className="mt-4">
          <label className="my-1 text-start text-sm font-medium text-gray-500">
            Category Name
          </label>
          <input
            type="text"
            className="w-full rounded-md border p-3 outline-none placeholder:text-sm placeholder:font-light focus:border-black"
            placeholder="Enter title"
            {...register('category')}
          />
          {errors.category && (
            <p className="text-sm font-light text-red-500">
              {errors.category.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="my-3 mb-10 mt-5 w-32 rounded-lg bg-green-500 px-3 py-2 font-semibold text-white focus:ring focus:ring-green-400"
        disabled={isPending}
      >
        {isPending ? (
          <span className="flex animate-spin items-center justify-center py-1 text-2xl">
            <ImSpinner9 />
          </span>
        ) : (
          'Submit'
        )}
      </button>
    </form>
  );
};

export default NewCategory;
