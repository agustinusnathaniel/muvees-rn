import { useGetMovieList } from '@/lib/services/tmdb-api/movies/getList';
import type { ListType } from '@/lib/services/tmdb-api/movies/getList/types';
import { useState } from 'react';

export const useMovieListPage = () => {
  const [section, setSection] = useState<ListType>('popular');

  const {
    data: movieListData,
    isLoading: isLoadingMovieList,
    mutate: refreshMovieList,
  } = useGetMovieList({
    section,
  });

  return {
    movieListData,
    isLoadingMovieList,
    refreshMovieList,
    section,
    setSection,
  };
};

export type MovieListPageViewModel = ReturnType<typeof useMovieListPage>;
