import { FlashList } from '@shopify/flash-list';
import { Link } from 'expo-router';
import { RefreshControl } from 'react-native';
import { H4, Image, Text, View, XStack } from 'tamagui';
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
      estimatedItemSize={20}
      data={movieListData?.results}
      refreshControl={
        <RefreshControl
          refreshing={isLoadingMovieList}
          onRefresh={refreshMovieList}
          progressViewOffset={20}
        />
      }
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={() => (
        <View margin="$5">
          <SelectInput
            options={sectionOptions}
            getOptionLabel={(item) => item.label}
            getOptionValue={(item) => item.value}
            value={section}
            onValueChange={(item) => setSection(item as ListType)}
            searchable
          />
        </View>
      )}
      ItemSeparatorComponent={() => <View height={20} />}
      ListFooterComponent={() => <View height={20} />}
      renderItem={({ item }) => (
        <Link href={`/movie/${item.id}`} asChild>
          <Card marginHorizontal={24} maxHeight={140} elevate>
            <XStack>
              <View
                overflow="hidden"
                borderTopLeftRadius={12}
                borderBottomLeftRadius={12}
              >
                <Image
                  source={{
                    width: 100,
                    height: 140,
                    uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                  }}
                  height="100%"
                  objectFit="cover"
                />
              </View>

              <Card.Header
                maxWidth="70%"
                justifyContent="space-between"
                height="100%"
              >
                <H4 numberOfLines={1} ellipsizeMode="tail">
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
