import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiEndpoint } from '../ApiEndpoint';
import { useAuthStore } from '@/store/useAuthStore';
import { iAuth, iUser } from '@/types/iUser';

const url = process.env.NEXT_PUBLIC_Server_APi;

export function useSignInMutation() {
  const queryClient = useQueryClient();
  // const setUserCredentials = useAuthStore((state) => state.setCredentials);
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      ApiEndpoint<iAuth>({
        method: 'post',
        url: `${url}/api/auth/signin`,
        data: { email, password },
      }),
    onSuccess: async (data) => {
      await queryClient.cancelQueries({ queryKey: ['auth'] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });
}
export function useSignupMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data }: { data: any }) =>
      ApiEndpoint<{ message: string; user: iUser }>({
        method: 'post',
        url: `${url}/api/auth/signup`,
        data: data,
      }),
    onSuccess: async () => {
      await queryClient.cancelQueries({ queryKey: ['auth'] });
    },
  });
}
export function useChangePasswordMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {}) =>
      ApiEndpoint<{ message: string; user: iUser }>({
        method: 'post',
        url: `${url}/api/auth/change-password`,
        data: data,
      }),
    onSuccess: async () => {
      await queryClient.cancelQueries({ queryKey: ['auth'] });
    },
  });
}
export function useResetPasswordMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      email,
      password,
      passwordConfirm,
    }: {
      password: string;
      passwordConfirm: string;
      email: string;
    }) =>
      ApiEndpoint<{ message: string; status: string }>({
        method: 'PUT',
        url: `${url}/api/auth/reset-password`,
        data: { email, password, passwordConfirm },
      }),
    onSuccess: async () => {
      await queryClient.cancelQueries({ queryKey: ['auth'] });
    },
  });
}
export function useNewResetTokenMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email }: { email: string }) =>
      ApiEndpoint<{ message: string; status: string }>({
        method: 'POST',
        url: `${url}/api/auth/reset-token`,
        data: { email },
      }),
    onSuccess: async () => {
      await queryClient.cancelQueries({ queryKey: ['auth'] });
    },
  });
}
export function useActivateEmailMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ otp, email }: { otp: string; email: string }) =>
      ApiEndpoint<{ message: string }>({
        method: 'PUT',
        url: `${url}/api/auth/activate-email`,
        data: { otp, email },
      }),
    onSuccess: async () => {
      await queryClient.cancelQueries({ queryKey: ['auth'] });
    },
  });
}
export function useVerifyOTPMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ otp, email }: { otp: string; email: string }) =>
      ApiEndpoint<{ message: string }>({
        method: 'post',
        url: `${url}/api/auth/verify-otp`,
        data: { otp, email },
      }),
    onSuccess: async () => {
      await queryClient.cancelQueries({ queryKey: ['auth'] });
    },
  });
}

export function useSendOTPMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email }: { email: string }) =>
      ApiEndpoint<{ message: string }>({
        method: 'PUT',
        url: `${url}/api/auth/send-otp`,
        data: { email },
      }),
    onSuccess: async () => {
      await queryClient.cancelQueries({ queryKey: ['auth'] });
    },
  });
}

export function useLogOutMutation() {
  const queryClient = useQueryClient();
  const logOut = useAuthStore((state) => state.LogOut);

  return useMutation({
    mutationFn: () =>
      ApiEndpoint<{ message: string; status: number }>({
        method: 'post',
        url: `${url}/api/auth/logout`,
      }),
    onSuccess: () => {
      logOut();
      setTimeout(() => {
        queryClient.resetQueries({ queryKey: ['auth'] });
      }, 1000);
    },
  });
}
