import { FlashList } from '@shopify/flash-list';
import { Link } from 'expo-router';
import { RefreshControl, View, Image, Pressable, Text } from 'react-native';
import { Card, SkeletonGroup } from 'heroui-native';

import { SelectInput } from '@/lib/components/SelectInput';
import { useViewModelContext } from '@/lib/providers/ViewModel';
import type { MovieListPageViewModel } from '@/lib/screens/movie/list/hooks';
import {
  buildTmdbImageUrl,
  TMDB_IMAGE_SIZES,
} from '@/lib/services/tmdb-api/image';
import type { ListType } from '@/lib/services/tmdb-api/movies/getList/types';

const sectionOptions: Array<{ label: string; value: ListType }> = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Now Playing', value: 'now_playing' },
  { label: 'Upcoming', value: 'upcoming' },
];

const loadingSkeletonKeys = ['1', '2', '3', '4'];

const MovieList = () => {
  const {
    movieListData,
    isLoadingMovieList,
    isRefreshingMovieList,
    refreshMovieList,
    section,
    setSection,
  } = useViewModelContext<MovieListPageViewModel>();

  return (
    <FlashList
      data={movieListData?.results}
      refreshControl={
        <RefreshControl
          refreshing={isLoadingMovieList}
          onRefresh={refreshMovieList}
        />
      }
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={() => (
        <View className="gap-2 p-4">
          <SelectInput
            options={sectionOptions}
            getOptionLabel={(item) => item.label}
            getOptionValue={(item) => item.value}
            value={section}
            onValueChange={(item) => setSection(item as ListType)}
            searchable
          />
          {isRefreshingMovieList ? (
            <Text className="text-xs text-muted">Refreshing movie list...</Text>
          ) : null}
        </View>
      )}
      ItemSeparatorComponent={() => <View className="h-3" />}
      ListFooterComponent={() => <View className="h-6" />}
      ListEmptyComponent={() => (
        <View className="px-4">
          {isLoadingMovieList ? (
            <View className="gap-3">
              {loadingSkeletonKeys.map((key) => (
                <SkeletonGroup key={key} isLoading className="h-35">
                  <Card className="h-35 flex-row overflow-hidden p-0">
                    <SkeletonGroup.Item className="h-full w-25 rounded-l-xl" />
                    <Card.Body className="flex-1 justify-between p-3">
                      <View className="gap-2">
                        <SkeletonGroup.Item className="h-4 w-11/12 rounded-md" />
                        <SkeletonGroup.Item className="h-4 w-8/12 rounded-md" />
                      </View>
                      <View className="gap-2">
                        <SkeletonGroup.Item className="h-3 w-full rounded-md" />
                        <SkeletonGroup.Item className="h-3 w-10/12 rounded-md" />
                        <SkeletonGroup.Item className="h-3 w-7/12 rounded-md" />
                      </View>
                    </Card.Body>
                  </Card>
                </SkeletonGroup>
              ))}
            </View>
          ) : (
            <Card className="p-4">
              <Card.Body className="gap-2">
                <Card.Title>No movies found</Card.Title>
                <Card.Description>
                  Try switching categories or pull to refresh.
                </Card.Description>
              </Card.Body>
            </Card>
          )}
        </View>
      )}
      renderItem={({ item }) => {
        const posterUri = buildTmdbImageUrl(
          item.poster_path,
          TMDB_IMAGE_SIZES.poster,
        );

        return (
          <Link
            href={{ pathname: '/movie/[id]', params: { id: item.id } }}
            asChild
          >
            <Pressable
              className="mx-4 active:opacity-90"
              hitSlop={6}
              accessibilityRole="button"
              accessibilityLabel={`Open details for ${item.title}`}
              accessibilityHint="Navigates to the movie details screen"
            >
              <Card className="h-35 flex-row overflow-hidden p-0">
                {posterUri ? (
                  <Image
                    source={{ uri: posterUri }}
                    className="h-35 w-25 rounded-l-xl"
                    resizeMode="cover"
                    accessible={false}
                  />
                ) : (
                  <View className="h-35 w-25 items-center justify-center rounded-l-xl bg-surface-secondary px-2">
                    <Text className="text-center text-xs text-muted">
                      No poster
                    </Text>
                  </View>
                )}
                <Card.Body className="flex-1 justify-between p-3">
                  <Card.Title
                    className="text-base leading-5"
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {item.title}
                  </Card.Title>
                  <Card.Description
                    className="text-sm"
                    numberOfLines={3}
                    ellipsizeMode="tail"
                  >
                    {item.overview || 'No synopsis available.'}
                  </Card.Description>
                </Card.Body>
              </Card>
            </Pressable>
          </Link>
        );
      }}
    />
  );
};

export default MovieList;
