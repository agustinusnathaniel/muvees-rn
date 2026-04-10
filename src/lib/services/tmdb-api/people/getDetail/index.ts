import { useGetAPI } from '@/lib/services/tmdb-api/hooks';
import type { PersonDetailResponse, UseGetPersonDetailParams } from './types';

export const useGetPersonDetail = ({ id, isReady }: UseGetPersonDetailParams) =>
  useGetAPI<PersonDetailResponse>({
    path: `/person/${id}`,
    isReady,
  });
