import { getAllBlogs } from '@/services/blogApi'
import useStore from '@/store/useStore'
import { iBlogResponse } from '@/types/iBlog'
import Image from 'next/image'
import Link from 'next/link'
import Paginate from './Paginate'
const url = process.env.NEXT_PUBLIC_Server_APi
export default async function Home() {


  const data: iBlogResponse = await getAllBlogs();
  // const items: iBlog[] = await getItems()
  // console.log(items)
  return (
    <main className="flex flex-col items-center justify-between">
      {data.blogs.map(item => (
        <div key={item._id} className='text-start flex flex-col gap-3 items-start'>
          <p className='text-2xl font-medium py-3'>{item?.title}</p>
          {item.image.url &&
            <Image
              height={1000}
              width={1000}
              src={item?.image?.url}
              alt={item?.title}
            />
          }
          <div className='ellipse-5 text-xs' dangerouslySetInnerHTML={{ __html: item?.content }} />
          <Link href={`/blog/${item.title.replace(/\s+/g, '-')}`} className='underline text-blue-600 py-2'>Read More</Link>
          <hr />
        </div>
      ))}
      <Paginate />
    </main>
  )
}
