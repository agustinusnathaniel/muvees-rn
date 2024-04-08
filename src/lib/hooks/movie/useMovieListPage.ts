import { useGetMovieList } from '@/lib/services/tmdb-api/movies/getList';

export const useMovieListPage = () => {
  const {
    data: movieListData,
    isLoading: isLoadingMovieList,
    mutate: refreshMovieList,
  } = useGetMovieList({
    section: 'popular',
  });

  return {
    movieListData,
    isLoadingMovieList,
    refreshMovieList,
  };
};

export type MovieListPageViewModel = ReturnType<typeof useMovieListPage>;
