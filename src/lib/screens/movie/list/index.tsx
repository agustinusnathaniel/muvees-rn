import { Spinner, View } from 'tamagui';

import { ViewModelProvider } from '@/lib/providers/ViewModel';

import MovieList from './components/MovieList';
import { useMovieListPage } from './hooks';

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
