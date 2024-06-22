import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiEndpoint } from '../ApiEndpoint';
import { iBlog, iBlogResponse } from '@/types/iBlog';

const url = process.env.NEXT_PUBLIC_Server_APi;

export function useGetAllBlogsQuery({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  return useQuery({
    queryFn: () =>
      ApiEndpoint<iBlogResponse>({
        method: 'GET',
        url: `${url}/api/blog/all-blogs?page=${page}&limit=${limit}`,
      }),
    queryKey: ['Blog', page, limit],
  });
}
export function useUpdateUserInfoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: iBlog) =>
      ApiEndpoint<string>({
        method: 'PUT',
        url: `${url}/api/v1/client/update-info`,
        data: body,
      }),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ['MyInfo'],
      });
    },
  });
}
export function useUpdatePictureMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (photo: any) =>
      ApiEndpoint<string>({
        method: 'PUT',
        url: `${url}/api/v1/client/update/picture`,
        data: { photo },
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['MyInfo'] });
    },
  });
}
