import { iBlogResponse } from '@/types/iBlog';

const url = process.env.NEXT_PUBLIC_Server_APi;

export async function RecentData() {
  const res = await fetch(`${url}/api/blog/all-blogs?page=1&limit=10`, {
    next: { revalidate: 100 },
  });

  if (!res.ok) {
  }
  console.log(res.json());
  return res.json();
}
export async function getDataById(modifiedTitle: string) {
  const res = await fetch(`${url}/api/blog/get/${modifiedTitle}`, {
    cache: 'no-cache',
  });

  if (!res.ok) {
  }

  return res.json();
}

export async function getAllBlogs(currentPage: number): Promise<iBlogResponse> {
  const limit = 24;
  const res = await fetch(
    `${url}/api/blog/all-blogs?page=${currentPage || 1}&limit=${limit}`,
    { next: { revalidate: 100 } },
  );

  if (!res.ok) {
  }
  return res.json();
}
