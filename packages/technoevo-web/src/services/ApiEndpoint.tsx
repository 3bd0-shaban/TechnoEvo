import { useQueryClient } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import { refreshToken } from './refreshToken';
import { getCookie, setCookie } from 'cookies-next';

export async function ApiEndpoint<T>(
  config: AxiosRequestConfig = {},
  formdata: boolean = false,
): Promise<T> {
  try {
    const accessToken = getCookie('accessToken');

    // Ensure that config.headers is defined or create it if it doesn't exist
    config.headers = config.headers || {};

    // Set the desired headers
    if (formdata) {
      // Set Content-Type to multipart/form-data for media requests
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      // Default to application/json for other requests
      config.headers['Content-Type'] = 'application/json';
    }

    config.withCredentials = true;
    config.headers['Access-Control-Allow-Credentials'] = 'true';
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 403) {
      // Token is expired or invalid, try to refresh it
      try {
        const { accessToken } = await refreshToken();
        setCookie('accessToken', accessToken);

        // Ensure that config.headers is defined or create it if it doesn't exist
        config.headers = config.headers || {};

        // Modify the 'Authorization' header with the new token
        config.headers['Authorization'] = `Bearer ${accessToken}`;

        // Set the desired headers
        config.headers['Content-Type'] = 'application/json';
        config.headers['Access-Control-Allow-Credentials'] = 'true';

        // Include credentials in the request
        config.withCredentials = true;

        const response = await axios(config);
        return response.data;
      } catch (refreshError) {
        throw refreshError;
      }
    }
    throw error;
  }
}
