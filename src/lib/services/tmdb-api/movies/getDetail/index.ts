import { useGetAPI } from '@/lib/services/tmdb-api/hooks';
import type { MovieDetailResponse, UseGetMovieDetailParams } from './types';

export const useGetMovieDetail = ({ id, isReady }: UseGetMovieDetailParams) =>
  useGetAPI<MovieDetailResponse>({
    path: `/movie/${id}`,
    isReady,
  });
