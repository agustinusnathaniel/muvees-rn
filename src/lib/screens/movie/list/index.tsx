import { View } from 'react-native';
import { Alert, Button, Spinner } from 'heroui-native';

import { ViewModelProvider } from '@/lib/providers/ViewModel';
import { getApiErrorMessage } from '@/lib/services/tmdb-api/error';

import MovieList from './components/MovieList';
import { useMovieListPage } from './hooks';

export const MovieListScreen = () => {
  const viewModel = useMovieListPage();
  const {
    movieListData,
    isLoadingMovieList,
    movieListError,
    refreshMovieList,
  } = viewModel;
  const showBlockingLoader = isLoadingMovieList && !movieListData;
  const movieListErrorMessage = movieListError
    ? getApiErrorMessage(
        movieListError,
        'Please check your connection and try again.',
      )
    : null;

  return (
    <ViewModelProvider {...viewModel}>
      <View className="flex-1">
        {movieListError ? (
          <View className="px-4 pt-4">
            <Alert status="danger">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>Unable to load movies</Alert.Title>
                <Alert.Description>
                  {movieListErrorMessage ?? 'Please try again shortly.'}
                </Alert.Description>
              </Alert.Content>
              <Button size="sm" variant="danger" onPress={() => void refreshMovieList()}>
                Retry
              </Button>
            </Alert>
          </View>
        ) : null}
        {showBlockingLoader && (
          <View
            className="absolute inset-0 items-center justify-center"
            pointerEvents="none"
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
          >
            <Spinner size="lg" />
          </View>
        )}
        <MovieList />
      </View>
    </ViewModelProvider>
  );
};
