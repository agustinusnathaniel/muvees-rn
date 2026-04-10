import { useGetAPI } from '@/lib/services/tmdb-api/hooks';
import type { MovieCreditsResponse } from './types';

export const useGetMovieCredits = ({
  id,
  isReady,
}: {
  id: string;
  isReady?: boolean;
}) =>
  useGetAPI<MovieCreditsResponse>({
    path: `/movie/${id}/credits`,
    isReady,
  });
