import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { iCategory, iCategoryResponse } from '@/types/iCategory';
import { ApiEndpoint } from '../ApiEndpoint';

const url = process.env.NEXT_PUBLIC_Server_APi;

export function useGetAllCategoriesQuery({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  return useQuery({
    queryFn: () =>
      ApiEndpoint<iCategoryResponse>({
        method: 'GET',
        url: `${url}/api/category/all-categories?page=${page}&limit=${limit}`,
      }),
    queryKey: ['Category', page, limit],
  });
}
export function useAddNewCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: iCategory) =>
      ApiEndpoint<string>({
        method: 'POST',
        url: `${url}/api/category/create-category`,
        data,
      }),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ['Category'],
      });
    },
  });
}

export function useUpdateCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: iCategory) =>
      ApiEndpoint<string>({
        method: 'PUT',
        url: `${url}/api/category/update`,
        data: body,
      }),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ['Category'],
      });
    },
  });
}

export function useDeleteCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryId: number) =>
      ApiEndpoint<string>({
        method: 'DELETE',
        url: `${url}/api/category/delete/${categoryId}`,
      }),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ['Category'],
      });
    },
  });
}
