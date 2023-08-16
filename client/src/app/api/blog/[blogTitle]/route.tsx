import { Blog, iBlog } from '@/models'
import { NextResponse } from 'next/server'


export async function GET(request: Request, { params }: {
    params: { blogTitle: string }
}) {
    
    try {
        const blog = await Blog.findOne({ title: params.blogTitle })
        return NextResponse.json(blog)
    } catch {
        return NextResponse.json('Error', {
            status: 500
        })
    }
}



export async function DELETE(request: Request, { params }: {
    params: { blogId: string }
}) {

    try {
        const deletedPost = await Blog.findByIdAndDelete(params.blogId)

        return NextResponse.json(deletedPost)
    } catch {
        return NextResponse.json(
            {
                error: 'Failed to remove post'
            },
            {
                status: 500
            }
        )
    }
}
