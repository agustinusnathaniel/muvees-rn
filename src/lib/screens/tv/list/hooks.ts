import { useGetTvList } from '@/lib/services/tmdb-api/tv/getList';
import type { TvListType } from '@/lib/services/tmdb-api/tv/getList/types';
import { useState } from 'react';

export const useTvListPage = () => {
  const [section, setSection] = useState<TvListType>('popular');

  const {
    data: tvListData,
    isLoading: isLoadingTvList,
    isValidating: isValidatingTvList,
    error: tvListError,
    mutate: refreshTvList,
  } = useGetTvList({
    section,
  });
  const hasTvListData = Boolean(tvListData);
  const isRefreshingTvList = isValidatingTvList && hasTvListData;
  const isInitialLoadingTvList = isLoadingTvList && !hasTvListData;

  return {
    tvListData,
    isLoadingTvList,
    isInitialLoadingTvList,
    isRefreshingTvList,
    tvListError,
    refreshTvList,
    section,
    setSection,
  };
};

export type TvListPageViewModel = ReturnType<typeof useTvListPage>;
