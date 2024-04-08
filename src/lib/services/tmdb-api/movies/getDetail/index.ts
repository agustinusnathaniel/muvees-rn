import { useGetAPI } from '@/lib/services/tmdb-api/hooks';
import type { MovieDetailResponse } from './types';

export const useGetMovieDetail = (id: number, isReady?: boolean) =>
  useGetAPI<MovieDetailResponse>({
    path: `/movie/${id}`,
    isReady,
  });
