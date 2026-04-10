import { useGetAPI } from '@/lib/services/tmdb-api/hooks';
import type {
  TTvListParams,
  TvListResponse,
  UseGetTvListParams,
} from './types';

const SEARCH_RESOURCE_PATH = '/search/tv';
const DISCOVER_RESOURCE_PATH = '/discover/tv';

const tvListEndpoint = ({ section, query, with_genres }: TTvListParams) => {
  if (query) {
    return SEARCH_RESOURCE_PATH;
  }
  if (with_genres) {
    return DISCOVER_RESOURCE_PATH;
  }
  return `/tv/${section}`;
};

export const useGetTvList = ({
  section,
  params,
  isReady,
}: UseGetTvListParams) =>
  useGetAPI<TvListResponse>({
    path: tvListEndpoint({
      section,
      query: params?.query,
      with_genres: params?.with_genres,
    }),
    config: params
      ? {
          searchParams: {
            ...params,
            ...(Array.isArray(params.with_genres)
              ? { with_genres: params.with_genres.join(',') }
              : {}),
          } as Record<string, string | number | boolean>,
        }
      : undefined,
    isReady,
  });
