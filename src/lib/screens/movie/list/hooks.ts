import { useGetMovieList } from '@/lib/services/tmdb-api/movies/getList';
import type { ListType } from '@/lib/services/tmdb-api/movies/getList/types';
import { useState } from 'react';

export const useMovieListPage = () => {
  const [section, setSection] = useState<ListType>('popular');

  const {
    data: movieListData,
    isLoading: isLoadingMovieList,
    isValidating: isValidatingMovieList,
    error: movieListError,
    mutate: refreshMovieList,
  } = useGetMovieList({
    section,
  });
  const isRefreshingMovieList = isValidatingMovieList && !!movieListData;

  return {
    movieListData,
    isLoadingMovieList,
    isRefreshingMovieList,
    movieListError,
    refreshMovieList,
    section,
    setSection,
  };
};

export type MovieListPageViewModel = ReturnType<typeof useMovieListPage>;
