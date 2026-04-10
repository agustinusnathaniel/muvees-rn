import { useGetAPI } from '@/lib/services/tmdb-api/hooks';
import type { MovieVideosResponse } from './types';

export const useGetMovieVideos = ({
  id,
  isReady,
}: {
  id: string;
  isReady?: boolean;
}) =>
  useGetAPI<MovieVideosResponse>({
    path: `/movie/${id}/videos`,
    isReady,
  });
