import { Alert, Button, Spinner } from 'heroui-native';
import { View } from 'react-native';

import { ViewModelProvider } from '@/lib/providers/ViewModel';
import { getApiErrorMessage } from '@/lib/services/tmdb-api/error';

import TvList from './components/TvList';
import { useTvListPage } from './hooks';

export const TvListScreen = () => {
  const viewModel = useTvListPage();
  const { tvListData, isInitialLoadingTvList, tvListError, refreshTvList } =
    viewModel;
  const showBlockingLoader = isInitialLoadingTvList;
  const tvListErrorMessage = tvListError
    ? getApiErrorMessage(
        tvListError,
        'Please check your connection and try again.',
      )
    : null;

  return (
    <ViewModelProvider {...viewModel}>
      <View className="flex-1">
        {tvListError ? (
          <View className="px-4 pt-4">
            <Alert status="danger">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>Unable to load TV shows</Alert.Title>
                <Alert.Description>
                  {tvListErrorMessage ?? 'Please try again shortly.'}
                </Alert.Description>
              </Alert.Content>
              <Button
                size="sm"
                variant="danger"
                onPress={() => void refreshTvList()}
              >
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
        {tvListError && !tvListData ? null : <TvList />}
      </View>
    </ViewModelProvider>
  );
};
