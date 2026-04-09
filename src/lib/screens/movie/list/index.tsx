import { View, ActivityIndicator } from 'react-native';

import { ViewModelProvider } from '@/lib/providers/ViewModel';

import MovieList from './components/MovieList';
import { useMovieListPage } from './hooks';

export const MovieListScreen = () => {
  const viewModel = useMovieListPage();
  const { isLoadingMovieList } = viewModel;

  return (
    <ViewModelProvider {...viewModel}>
      <View className="flex-1">
        {isLoadingMovieList && (
          <View className="absolute inset-0 items-center justify-center">
            <ActivityIndicator size="large" />
          </View>
        )}
        <MovieList />
      </View>
    </ViewModelProvider>
  );
};
