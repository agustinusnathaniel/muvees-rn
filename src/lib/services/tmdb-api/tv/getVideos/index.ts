import { useGetAPI } from '@/lib/services/tmdb-api/hooks';
import type { TvVideosResponse } from './types';

export const useGetTvVideos = ({
  id,
  isReady,
}: {
  id: string;
  isReady?: boolean;
}) =>
  useGetAPI<TvVideosResponse>({
    path: `/tv/${id}/videos`,
    isReady,
  });
