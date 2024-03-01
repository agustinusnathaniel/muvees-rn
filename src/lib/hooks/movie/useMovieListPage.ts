import { useGetMovieList } from '@/lib/services/tmdb-api/movies/getList'

export const useMovieListPage = () => {
  const { data: movieListData, isLoading: isLoadingMovieList } = useGetMovieList({
    section: 'popular',
  })

  return {
    movieListData,
    isLoadingMovieList,
  }
}

export type MovieListPageViewModel = ReturnType<typeof useMovieListPage>
