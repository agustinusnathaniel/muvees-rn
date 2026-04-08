import { FlashList } from '@shopify/flash-list';
import { Link } from 'expo-router';
import { RefreshControl } from 'react-native';
import { H4, Image, Text, View, XStack, YStack } from 'tamagui';
import { Card } from 'tamagui';

import { SelectInput } from '@/lib/components/SelectInput';
import { useViewModelContext } from '@/lib/providers/ViewModel';
import type { MovieListPageViewModel } from '@/lib/screens/movie/list/hooks';
import type { ListType } from '@/lib/services/tmdb-api/movies/getList/types';

const sectionOptions: Array<{ label: string; value: ListType }> = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Now Playing', value: 'now_playing' },
  { label: 'Upcoming', value: 'upcoming' },
];

const MovieList = () => {
  const {
    movieListData,
    isLoadingMovieList,
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
        <YStack p="$4">
          <SelectInput
            options={sectionOptions}
            getOptionLabel={(item) => item.label}
            getOptionValue={(item) => item.value}
            value={section}
            onValueChange={(item) => setSection(item as ListType)}
            searchable
          />
        </YStack>
      )}
      ItemSeparatorComponent={() => <View height={12} />}
      ListFooterComponent={() => <View height={24} />}
      renderItem={({ item }) => (
        <Link
          href={{ pathname: '/movie/[id]', params: { id: item.id } }}
          asChild
        >
          <Card
            marginHorizontal={16}
            height={140}
            elevation={2}
            borderRadius={12}
            overflow="hidden"
            pressStyle={{ scale: 0.98, opacity: 0.9 }}
          >
            <XStack>
              <Image
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                width={100}
                height={140}
                objectFit="cover"
              />
              <Card.Header
                flex={1}
                p={12}
                justify="space-between"
              >
                <H4
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {item.title}
                </H4>
                <Text
                  fontSize="$3"
                  color="$gray10"
                  ellipsizeMode="tail"
                  numberOfLines={3}
                >
                  {item.overview}
                </Text>
              </Card.Header>
            </XStack>
          </Card>
        </Link>
      )}
    />
  );
};

export default MovieList;
