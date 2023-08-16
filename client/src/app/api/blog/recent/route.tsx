import { createEdgeRouter, createRouter } from "next-connect";

import { Blog, iBlog } from '@/models'
import { NextRequest, NextResponse } from 'next/server'



interface RequestContext {
    params: {
        id: string;
    };
}


export async function GET(request: Request) {
    try {
        const posts: iBlog[] = await Blog.find()
        if (!posts) {
            return NextResponse.json({ msg: "No data founded" }, { status: 404 })
        }
        console.log(posts)
        return NextResponse.json(posts)
    } catch (error) {
        return NextResponse.json(
            { msg: error },
            {
                status: 400,
                statusText: "Internal Server Error",
            })
    }
}
// const router = createEdgeRouter<NextRequest, RequestContext>();
// router
//     .get(async (req, res) => {
//         try {
//             const posts: iBlog[] = await Blog.find()
//             console.log(posts)
//             return NextResponse.json({ posts })

//             // return new Response(JSON.stringify(posts))
//             // return NextResponse.json(posts.reverse())
//         } catch (error) {
//             return new Response(null, { status: 500 })
//         }
//     })

// export async function GET(request: NextRequest, ctx: RequestContext) {
//     return router.run(request, ctx);
// }