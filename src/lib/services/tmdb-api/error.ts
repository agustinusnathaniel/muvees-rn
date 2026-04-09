import { HTTPError, TimeoutError } from 'ky';

const isTransientStatus = (status?: number) =>
  status === 408 || status === 425 || status === 429 || (status ?? 0) >= 500;

export const shouldRetryApiError = (error: unknown) => {
  // Handle cancellation
  if (error instanceof DOMException && error.name === 'AbortError') {
    return false;
  }

  // Handle ky HTTP errors
  if (error instanceof HTTPError) {
    const status = error.response.status;
    return isTransientStatus(status);
  }

  // Handle timeout errors
  if (error instanceof TimeoutError) {
    return true;
  }

  // Handle network errors (TypeError for network issues)
  if (error instanceof TypeError && error.message === 'Failed to fetch') {
    return true;
  }

  // Default: retry for unknown errors
  return true;
};

export const getApiErrorMessage = (
  error: unknown,
  fallback = 'Something went wrong. Please try again.',
) => {
  // Handle ky HTTP errors
  if (error instanceof HTTPError) {
    const status = error.response.status;

    if (status === 404) {
      return 'The requested resource could not be found.';
    }

    if (status === 401 || status === 403) {
      return 'Authorization failed. Please verify your API credentials.';
    }

    if (status === 429) {
      return 'Too many requests. Please wait a moment and try again.';
    }

    return fallback;
  }

  // Handle timeout errors
  if (error instanceof TimeoutError) {
    return 'Request timed out. Please check your connection and retry.';
  }

  // Handle network errors
  if (error instanceof TypeError && error.message === 'Failed to fetch') {
    return 'Network error. Please check your internet connection.';
  }

  // Handle abort/cancel
  if (error instanceof DOMException && error.name === 'AbortError') {
    return fallback;
  }

  return fallback;
};
