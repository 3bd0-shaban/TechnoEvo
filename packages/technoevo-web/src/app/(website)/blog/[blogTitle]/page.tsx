import { getDataById } from '@/services/blogApi';
import { iBlog } from '@/types/iBlog';
import Image from 'next/image';

export default async function Home({
  params,
}: {
  params: { blogTitle: string };
}) {
  // const modifiedTitle = params.blogTitle.replace(/-/g, ' ');
  const data: iBlog = await getDataById(params.blogTitle);
  return (
    <main className="flex flex-col items-center justify-between">
      <div>
        <p className="py-3 text-3xl font-medium">{data?.blog_Title}</p>
        {data?.thumbnail_Url && (
          <Image
            height={1000}
            width={1000}
            src={data?.thumbnail_Url}
            alt={data?.blog_Title as string}
          />
        )}
        {data?.blog_des && (
          <div dangerouslySetInnerHTML={{ __html: data?.blog_des as string }} />
        )}
      </div>
    </main>
  );
}
