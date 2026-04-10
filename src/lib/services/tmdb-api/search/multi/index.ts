import { useGetAPI } from '@/lib/services/tmdb-api/hooks';
import type { MultiSearchResponse } from './types';

export const useMultiSearch = ({
  query,
  isReady,
}: {
  query: string;
  isReady?: boolean;
}) =>
  useGetAPI<MultiSearchResponse>({
    path: '/search/multi',
    config: {
      searchParams: { query },
    },
    isReady,
  });
