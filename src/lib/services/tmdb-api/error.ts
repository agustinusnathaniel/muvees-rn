import { AxiosError } from 'axios';

const isTransientStatus = (status?: number) =>
  status === 408 || status === 425 || status === 429 || (status ?? 0) >= 500;

export const shouldRetryApiError = (error: unknown) => {
  if (!(error instanceof AxiosError)) {
    return true;
  }

  if (error.code === 'ERR_CANCELED') {
    return false;
  }

  if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') {
    return true;
  }

  return isTransientStatus(error.response?.status);
};

export const getApiErrorMessage = (
  error: unknown,
  fallback = 'Something went wrong. Please try again.',
) => {
  if (!(error instanceof AxiosError)) {
    return fallback;
  }

  const status = error.response?.status;

  if (status === 404) {
    return 'The requested resource could not be found.';
  }

  if (status === 401 || status === 403) {
    return 'Authorization failed. Please verify your API credentials.';
  }

  if (status === 429) {
    return 'Too many requests. Please wait a moment and try again.';
  }

  if (error.code === 'ECONNABORTED') {
    return 'Request timed out. Please check your connection and retry.';
  }

  if (error.code === 'ERR_NETWORK') {
    return 'Network error. Please check your internet connection.';
  }

  return fallback;
};

