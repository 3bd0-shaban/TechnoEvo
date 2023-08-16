import { createEdgeRouter, createRouter } from "next-connect";

import cloudinary from '@/lib/cloudinary'
import { Blog, iBlog } from '@/models'
import { NextRequest, NextResponse } from 'next/server'
import { NextApiRequest, NextApiResponse } from 'next'
import upload from "@/lib/multer";


interface RequestContext {
    params: {
        id: string;
    };
}



const router = createEdgeRouter<NextRequest, RequestContext>();
router
    .get(async (req, res) => {
        try {
            const posts: iBlog[] = await Blog.find()
            return NextResponse.json(posts.reverse())
        } catch {
            return NextResponse.json('Error', {
                status: 500
            })
        }
    })
    // .use(upload.single("image"))
    .post(async (req, res) => {
        try {
            const body = await req.json();
            console.log(body)
            // console.log(req.file)
            const { image, title, content } = body;
            if (!title || !content) {
                return NextResponse.json(
                    { msg: 'required title ans=d=' },
                    {
                        status: 400,
                        statusText: "Internal Server Error",
                    })
                // return NextResponse.json({ Products, totalCount: Products.length, status: 'success' })
                // return new NextResponse({ message: "fill all fields" }, { status: 401 });
            }
            // const result = await cloudinary.uploader.upload(image, {
            //     folder: "TecknoEvo/blogs",
            //     transformation: [
            //         { width: 500, quality: 'auto' }
            //     ],
            //     resource_type: 'auto'
            // });
            const newPost = new Blog({
                title, content,
                // image: {
                //     ur: result.url
                // }
            })
            const t = await newPost.save()
                .then((result) => {
                    return NextResponse.json({ msg: "Successfuly created new User: " + result, status: 200 })

                    // return new Response(JSON.stringify(result))
                }).catch((error) => {
                    return NextResponse.json({ error: "Error on '/api/register': " + error, status: 400 })

                })
        } catch (error) {
            return NextResponse.json(
                { msg: error },
                {
                    status: 400,
                    statusText: "Internal Server Error",
                })
        }
    });

export async function GET(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}

export async function POST(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}