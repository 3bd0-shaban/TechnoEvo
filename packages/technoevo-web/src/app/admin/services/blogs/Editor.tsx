'use client';
import React, { FC, useState } from 'react';
import { ImSpinner9 } from 'react-icons/im';
import { toast } from 'react-hot-toast';
import dynamic from 'next/dynamic';
import { useAddNewBlogMutation } from '@/services/Apis/BlogApi';
import { getError } from '@/helpers/getError';
import { useForm } from 'react-hook-form';
import { iBlog } from '@/types/iBlog';
import { useGetAllCategoriesQuery } from '@/services/Apis/categoryApi';
import Select from 'react-select';
import { joiResolver } from '@hookform/resolvers/joi';
import { blogValidations } from '@/validations/blog.validate';

interface EditorProps {}

const JoditReact = dynamic(() => import('jodit-react-ts'), {
  ssr: false,
});

const Editor: FC<EditorProps> = ({}) => {
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm<iBlog>({
    resolver: joiResolver(blogValidations.craeteBlogSchema),
  });
  const [image, setImage] = useState<File | null>(null);
  const { data } = useGetAllCategoriesQuery({ page: 1, limit: 30 });
  const { categories } = data || {};
  const { mutateAsync, isPending } = useAddNewBlogMutation();
  const onSubmit = async (data: iBlog) => {
    const { blog_Title, blog_des, categories } = data;
    await mutateAsync({
      data: { blog_Title, blog_des, categories },
      thumbnail: image as File,
    })
      .then(() => {
        toast.success('blog added successfully');
        reset();
      })
      .catch((error) => {
        toast.error(getError(error));
      });
  };
  console.log(errors);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-y-4">
        <div className="mt-4">
          <label className="my-1 text-start text-sm font-medium text-gray-500">
            Title
          </label>
          <input
            type="text"
            className="w-full rounded-md border p-3 outline-none placeholder:text-sm placeholder:font-light focus:border-black"
            placeholder="Enter title"
            {...register('blog_Title')}
          />
          {errors.blog_Title && (
            <p className="text-sm font-light text-red-500">
              {errors.blog_Title.message}
            </p>
          )}
        </div>
        <div className="mt-4">
          <label className="my-1 text-start text-sm font-medium text-gray-500">
            Categories
          </label>
          <Select
            {...register('categories')}
            options={categories?.map((category) => ({
              label: category.category,
              value: category.id,
            }))}
            isMulti
            onChange={(selected) =>
              setValue(
                'categories',
                selected.map((category) => category.value) as any,
              )
            }
          />
          {errors.categories && (
            <p className="text-sm font-light text-red-500">
              {errors.categories.message}
            </p>
          )}
        </div>
        <div>
          <label className="my-1 text-start text-sm font-medium text-gray-500">
            Description
          </label>
          <JoditReact
            onChange={(editorcontent: string) => {
              setValue('blog_des', editorcontent);
            }}
          />
          {errors.blog_des && (
            <p className="text-sm font-light text-red-500">
              {errors.blog_des.message}
            </p>
          )}
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <label htmlFor="picture">Picture</label>
          <input
            id="picture"
            type="file"
            onChange={(e) => setImage(e.target.files && e.target.files[0])}
          />
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

export default Editor;
