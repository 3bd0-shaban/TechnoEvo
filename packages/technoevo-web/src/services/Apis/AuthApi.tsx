import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiEndpoint } from './ApiEndpoint';

const url = process.env.NEXT_PUBLIC_API_KEY;

export function useSignInMutation() {
  const queryClient = useQueryClient();
  const setUserCredentials = useAuthStore((state) => state.setCredentials);
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      ApiEndpoint<AuthState>(
        {
          method: 'post',
          url: `${url}/api/v1/auth/signin`,
          data: { email, password },
        },
        queryClient,
      ),
    onSuccess: async (data) => {
      await queryClient.cancelQueries({ queryKey: ['auth'] });
      localStorage.setItem('id', JSON.stringify(data.user._id));
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
      ApiEndpoint<{ message: string; user: iClient }>(
        {
          method: 'post',
          url: `${url}/api/v1/auth/signup`,
          data: data,
        },
        queryClient,
      ),
    onSuccess: async () => {
      await queryClient.cancelQueries({ queryKey: ['auth'] });
    },
  });
}
export function useChangePasswordMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {}) =>
      ApiEndpoint<{ message: string; user: iClient }>(
        {
          method: 'post',
          url: `${url}/api/v1/auth/change-password`,
          data: data,
        },
        queryClient,
      ),
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
      ApiEndpoint<{ message: string; status: string }>(
        {
          method: 'PUT',
          url: `${url}/api/v1/auth/reset-password`,
          data: { email, password, passwordConfirm },
        },
        queryClient,
      ),
    onSuccess: async () => {
      await queryClient.cancelQueries({ queryKey: ['auth'] });
    },
  });
}
export function useNewResetTokenMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email }: { email: string }) =>
      ApiEndpoint<{ message: string; status: string }>(
        {
          method: 'POST',
          url: `${url}/api/v1/auth/reset-token`,
          data: { email },
        },
        queryClient,
      ),
    onSuccess: async () => {
      await queryClient.cancelQueries({ queryKey: ['auth'] });
    },
  });
}
export function useActivateEmailMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ otp, email }: { otp: string; email: string }) =>
      ApiEndpoint<{ message: string }>(
        {
          method: 'PUT',
          url: `${url}/api/v1/auth/activate-email`,
          data: { otp, email },
        },
        queryClient,
      ),
    onSuccess: async () => {
      await queryClient.cancelQueries({ queryKey: ['auth'] });
    },
  });
}
export function useVerifyOTPMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ otp, email }: { otp: string; email: string }) =>
      ApiEndpoint<{ message: string }>(
        {
          method: 'post',
          url: `${url}/api/v1/auth/verify-otp`,
          data: { otp, email },
        },
        queryClient,
      ),
    onSuccess: async () => {
      await queryClient.cancelQueries({ queryKey: ['auth'] });
    },
  });
}

export function useSendOTPMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email }: { email: string }) =>
      ApiEndpoint<{ message: string }>(
        {
          method: 'PUT',
          url: `${url}/api/v1/auth/send-otp`,
          data: { email },
        },
        queryClient,
      ),
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
      ApiEndpoint<{ message: string; status: number }>(
        { method: 'post', url: `${url}/api/v1/auth/logout` },

        queryClient,
      ),
    onSuccess: () => {
      logOut();
      setTimeout(() => {
        queryClient.resetQueries({ queryKey: ['auth'] });
      }, 1000);
    },
  });
}
