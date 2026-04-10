import { useGetAPI } from '@/lib/services/tmdb-api/hooks';
import type { SimilarMovieListResponse } from './types';

export const useGetSimilarMovies = ({
  id,
  isReady,
}: {
  id: string;
  isReady?: boolean;
}) =>
  useGetAPI<SimilarMovieListResponse>({
    path: `/movie/${id}/similar`,
    isReady,
  });
