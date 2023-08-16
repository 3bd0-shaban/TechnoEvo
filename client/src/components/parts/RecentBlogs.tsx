const url = process.env.NEXT_PUBLIC_Server_APi

export async function RecentData() {
    const res = await fetch(`${url}/api/blog/recent`, { next: { revalidate: 10 }, })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        // throw new Error('Failed to fetch data')
    }

    return res.json()
}
