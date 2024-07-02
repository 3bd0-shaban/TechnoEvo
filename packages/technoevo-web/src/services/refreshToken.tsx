import axios, { AxiosRequestConfig } from 'axios';

const url = process.env.NEXT_PUBLIC_Server_APi;
export async function refreshToken() {
  try {
    const headers: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
      },
      withCredentials: true,
    };

    const response = await axios.get<{ access_token: string }>(
      `${url}/api/auth/refreshToken`,
      headers,
    );

    return response.data;
  } catch (error) {
    // Handle token refresh errors here
    throw error;
  }
}
