import { useGetAPI } from '@/lib/services/tmdb-api/hooks';
import type { TvSimilarResponse } from './types';

export const useGetSimilarTvShows = ({
  id,
  isReady,
}: {
  id: string;
  isReady?: boolean;
}) =>
  useGetAPI<TvSimilarResponse>({
    path: `/tv/${id}/similar`,
    isReady,
  });
