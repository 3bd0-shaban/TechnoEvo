import type { Metadata } from 'next'
import Link from 'next/link'
import { RecentData } from '@/components/parts/RecentBlogs'
import { iBlog } from '@/types/iBlog'
const url = process.env.NEXT_PUBLIC_Server_APi

export const metadata: Metadata = {
    title: 'TechnoEvo',
    description: 'Generated by create next app',
}

export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {

    const data: iBlog[] = await RecentData();
    // console.log('data', JSON.stringify(data))
    return (

        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
            <div className='col-span-2'>
                {children}
            </div>
            <div>
                {data?.map(item => (
                    <div key={item._id} className='py-1'>
                        <Link href={`/blog/${item.title.replace(/\s+/g, '-')}`}
                            className='text-start text-sm text-ellipsis font-semibold hover:underline'>
                            {item.title}
                        </Link>
                    </div>
                ))}
            </div>
        </div>

    )
}