import { useMovieListPage } from '@/lib/hooks/movie/useMovieListPage';
import { ViewModelProvider } from '@/lib/providers/ViewModel';
import { Spinner, View } from 'tamagui';
import MovieList from './components/MovieList';

const MovieListScreen = () => {
  const viewModel = useMovieListPage();

  const { isLoadingMovieList } = viewModel;

  return (
    <ViewModelProvider {...viewModel}>
      <View flex={1}>
        {isLoadingMovieList ? <Spinner /> : null}
        <MovieList />
      </View>
    </ViewModelProvider>
  );
};

export default MovieListScreen;
