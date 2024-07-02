import axios, { AxiosRequestConfig } from 'axios';
import { refreshToken } from './refreshToken';
import { getCookie, setCookie } from 'cookies-next';

export async function ApiEndpoint<T>(
  config: AxiosRequestConfig = {},
  formdata: 'multipart/form-data' | 'application/json' = 'application/json',
): Promise<T> {
  try {
    const access_token = getCookie('access_token');

    // Ensure that config.headers is defined or create it if it doesn't exist
    config.headers = config.headers || {};

    config.headers['Content-Type'] = formdata;
    config.withCredentials = true;
    config.headers['Access-Control-Allow-Credentials'] = 'true';
    if (access_token) {
      config.headers['Authorization'] = `Bearer ${access_token}`;
    }
    console.log(config);
    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 403) {
      // Token is expired or invalid, try to refresh it
      try {
        const { access_token } = await refreshToken();
        setCookie('access_token', access_token);

        // Ensure that config.headers is defined or create it if it doesn't exist
        config.headers = config.headers || {};

        // Modify the 'Authorization' header with the new token
        config.headers['Authorization'] = `Bearer ${access_token}`;

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
