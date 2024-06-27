'use client';
import axios from 'axios';
import React, { FC, useState } from 'react';
import { ImSpinner9 } from 'react-icons/im';
import { toast } from 'react-hot-toast';
import dynamic from 'next/dynamic';
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { NewBlogSchema } from '@/lib/validation';
interface EditorProps {}
const JoditReact = dynamic(() => import('jodit-react-ts'), {
  ssr: false, // Ensure the component is not rendered on the server
});
const url = process.env.NEXT_PUBLIC_Server_APi;
const Editor: FC<EditorProps> = ({}) => {
  // const headers = {
  //     'Content-Type': 'application/json', // Specify the content type
  // };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);

  const HandleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    try {
      // NewBlogSchema.parse(data);
      // formData.append('title', title);
      formData.append('content', content);
      formData.append('image', image as File);
      setIsLoading(true);
      axios
        .post(`${url}/api/blog`, formData)
        .then((response) => {
          setIsLoading(false);
          setImage(null);
          setContent('');
          setTitle('');
          toast.success(response.data.message);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
          setIsLoading(false);
        });
    } catch (error: any) {
      if (error?.errors?.length > 0) {
        toast.error(error.errors[0].message);
      } else {
        toast.error('An Error Accoured');
      }
    }
  };

  return (
    <form onSubmit={HandleSubmit}>
      <div className="flex flex-col gap-y-4">
        <div className="mt-4">
          <label className="my-1 text-start text-sm font-medium text-gray-500">
            Title
          </label>
          <input
            type="text"
            className="w-full rounded-md border p-3 outline-none placeholder:text-sm placeholder:font-light focus:border-black"
            placeholder="Enter title"
            value={title}
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="my-1 text-start text-sm font-medium text-gray-500">
            Description
          </label>
          <JoditReact
            defaultValue={content}
            // name='content'
            onChange={(editorcontent: string) => {
              setContent(editorcontent);
            }}
          />
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
        disabled={isLoading}
      >
        {isLoading ? (
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
