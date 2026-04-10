import { useGetAPI } from '@/lib/services/tmdb-api/hooks';
import type { TvCreditsResponse } from './types';

export const useGetTvCredits = ({
  id,
  isReady,
}: {
  id: string;
  isReady?: boolean;
}) =>
  useGetAPI<TvCreditsResponse>({
    path: `/tv/${id}/credits`,
    isReady,
  });
