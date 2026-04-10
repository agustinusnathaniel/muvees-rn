import { useGetAPI } from '@/lib/services/tmdb-api/hooks';
import type { TvDetailResponse, UseGetTvDetailParams } from './types';

export const useGetTvDetail = ({ id, isReady }: UseGetTvDetailParams) =>
  useGetAPI<TvDetailResponse>({
    path: `/tv/${id}`,
    isReady,
  });
