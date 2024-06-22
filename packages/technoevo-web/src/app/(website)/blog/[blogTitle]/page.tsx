import { getDataById } from '@/services/blogApi';
import { iBlog } from '@/types/iBlog';
import Image from 'next/image';

export default async function Home({ params }: { params: { blogTitle: string } }) {
    // const modifiedTitle = params.blogTitle.replace(/-/g, ' ');
    const data: iBlog = await getDataById(params.blogTitle);
    return (
        <main className="flex flex-col items-center justify-between">
            <div>
                <p className='text-3xl font-medium py-3'>{data?.title}</p>
                {data?.image?.url &&
                    <Image
                        height={1000}
                        width={1000}
                        src={data?.image?.url}
                        alt={data?.title}
                    />
                }
                {data?.content && <div dangerouslySetInnerHTML={{ __html: data?.content as string }} />}
            </div>
        </main>
    )
}
