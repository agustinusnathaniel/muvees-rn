import useSWR, { type SWRConfiguration } from 'swr';
import { shouldRetryApiError } from './error';
import { type APIFetcherParams, getAPI } from './fetcher';

const swrOptions: SWRConfiguration = {
  shouldRetryOnError: shouldRetryApiError,
  errorRetryCount: 2,
  errorRetryInterval: 1200,
  revalidateOnMount: true,
  revalidateOnReconnect: false,
  revalidateOnFocus: false,
  revalidateIfStale: true,
};

type UseGetApiParams = APIFetcherParams & {
  isReady?: boolean;
};

/**
 * automatic / immediate GET without trigger
 */
export const useGetAPI = <ResDataType>({
  path,
  config,
  isReady = true,
}: UseGetApiParams) => {
  const { data, isLoading, isValidating, error, mutate } = useSWR(
    isReady ? [path, config] : null,
    ([path, config]) => getAPI<ResDataType>({ path, config }),
    swrOptions,
  );

  return {
    data,
    isLoading,
    isValidating,
    error,
    mutate,
  };
};
