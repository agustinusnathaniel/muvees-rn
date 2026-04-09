import dayjs from 'dayjs';
import { Stack, useLocalSearchParams } from 'expo-router';
import { RefreshControl, useWindowDimensions, ScrollView, View, Image, Text } from 'react-native';
import { Alert, Button, Card, Chip, Spinner } from 'heroui-native';

import { getApiErrorMessage } from '@/lib/services/tmdb-api/error';
import {
  buildTmdbImageUrl,
  TMDB_IMAGE_SIZES,
} from '@/lib/services/tmdb-api/image';
import { useGetMovieDetail } from '@/lib/services/tmdb-api/movies/getDetail';

const MovieDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading, isValidating, error, mutate } = useGetMovieDetail({
    id: id ?? '',
    isReady: !!id,
  });
  const { width } = useWindowDimensions();

  const posterWidth = (1.5 / 5) * width;
  const posterHeight = (2.25 / 5) * width;
  const backdropUri = buildTmdbImageUrl(
    data?.backdrop_path,
    TMDB_IMAGE_SIZES.backdrop,
  );
  const posterUri = buildTmdbImageUrl(data?.poster_path, TMDB_IMAGE_SIZES.poster);
  const isRefreshing = isValidating && !!data;
  const hasBlockingState = isLoading || Boolean(error);
  const shouldShowNotFound = !(data || hasBlockingState);
  const errorMessage = error
    ? getApiErrorMessage(error, 'Pull to refresh or retry below.')
    : null;

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: data?.title ?? 'Loading...',
        }}
      />
      <ScrollView
        className="flex-1 bg-background"
        contentContainerClassName="pb-8"
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={() => void mutate()} />
        }
      >
        <View className="gap-4 p-4">
          {isLoading && !data ? (
            <View className="items-center justify-center py-12">
              <Spinner size="lg" />
            </View>
          ) : null}
          {error ? (
            <Alert status="danger">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>Unable to load this movie</Alert.Title>
                <Alert.Description>
                  {errorMessage ?? 'Pull to refresh or retry below.'}
                </Alert.Description>
              </Alert.Content>
              <Button size="sm" variant="danger" onPress={() => void mutate()}>
                Retry
              </Button>
            </Alert>
          ) : null}
          {isRefreshing ? (
            <Text className="text-xs text-muted">Refreshing movie details...</Text>
          ) : null}
          {data ? (
            <>
              {backdropUri ? (
                <Image
                  source={{ uri: backdropUri }}
                  className="h-52 w-full rounded-2xl"
                  resizeMode="cover"
                  accessibilityRole="image"
                  accessibilityLabel={`${data.title} backdrop`}
                />
              ) : (
                <View className="h-52 w-full items-center justify-center rounded-2xl bg-surface-secondary">
                  <Text className="text-sm text-muted">Backdrop unavailable</Text>
                </View>
              )}
              <Card className="gap-4">
                <Card.Body className="gap-4">
                  <View className="flex-row items-start gap-3">
                    {posterUri ? (
                      <Image
                        source={{ uri: posterUri }}
                        className="rounded-xl"
                        style={{ width: posterWidth, height: posterHeight }}
                        resizeMode="cover"
                        accessible={false}
                      />
                    ) : (
                      <View
                        className="items-center justify-center rounded-xl bg-surface-secondary px-2"
                        style={{ width: posterWidth, height: posterHeight }}
                      >
                        <Text className="text-center text-xs text-muted">
                          No poster
                        </Text>
                      </View>
                    )}
                    <View className="flex-1 justify-center gap-2" style={{ minWidth: 0 }}>
                      <Card.Title className="text-2xl leading-7" numberOfLines={3}>
                        {data.title}
                      </Card.Title>
                      {data.release_date ? (
                        <Card.Description>
                          Release: {dayjs(data.release_date).format('DD MMM YYYY')}
                        </Card.Description>
                      ) : null}
                    </View>
                  </View>
                  {data.genres?.length ? (
                    <View className="flex-row flex-wrap gap-2">
                      {data.genres.map((genre) => (
                        <Chip
                          key={genre.id}
                          variant="soft"
                          color="accent"
                          size="sm"
                          accessibilityRole="text"
                          accessibilityLabel={`Genre ${genre.name}`}
                        >
                          <Chip.Label>{genre.name}</Chip.Label>
                        </Chip>
                      ))}
                    </View>
                  ) : null}
                  <Card.Description className="text-base leading-6">
                    {data.overview || 'No overview available yet.'}
                  </Card.Description>
                </Card.Body>
              </Card>
            </>
          ) : null}
          {shouldShowNotFound ? (
            <Card className="p-4">
              <Card.Body className="gap-2">
                <Card.Title>Movie not found</Card.Title>
                <Card.Description>
                  We couldn&apos;t find the requested movie.
                </Card.Description>
              </Card.Body>
            </Card>
          ) : null}
        </View>
      </ScrollView>
    </>
  );
};

export default MovieDetailScreen;
