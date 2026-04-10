import { useGetAPI } from '@/lib/services/tmdb-api/hooks';
import type { PersonCreditsResponse } from '@/lib/services/tmdb-api/people/getDetail/types';

export const useGetPersonCredits = ({
  id,
  isReady,
}: {
  id: string;
  isReady?: boolean;
}) =>
  useGetAPI<PersonCreditsResponse>({
    path: `/person/${id}/combined_credits`,
    isReady,
  });
