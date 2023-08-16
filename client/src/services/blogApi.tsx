const url = process.env.NEXT_PUBLIC_Server_APi

export async function RecentData() {
    const res = await fetch(`${url}/api/blog/recent`, { next: { revalidate: 100 }, })

    if (!res.ok) {
    }

    return res.json()
}
export async function getDataById(modifiedTitle: string) {
    const res = await fetch(`${url}/api/blog/id/${modifiedTitle}`, {
        cache: "no-cache"
    })

    if (!res.ok) {
    }

    return res.json()
}
export async function getAllBlogs() {
    const currentPage = 1;
    const limit = 4;
    const res = await fetch(`${url}/api/blog?page=${currentPage}&limit=${limit}`, { next: { revalidate: 100 } })

    if (!res.ok) {

    }

    return res.json()
}
