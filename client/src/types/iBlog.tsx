export interface iBlog {
    _id:string,
    title: string
    content: string,
    user: string,
    url: string,
    createdAt: string,
    image: {
        public_id: string,
        url: string
    }
}
export interface iBlogResponse {
    blogs: iBlog[],
    results: number,
    totalCount: number,
}
