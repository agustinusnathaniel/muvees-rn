import { FlashList } from '@shopify/flash-list';
import { Link } from 'expo-router';
import { RefreshControl, View, Image, Pressable, Text } from 'react-native';
import { useThemeColor } from 'heroui-native';

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
  const mutedColor = useThemeColor('muted');
  const surfaceFgColor = useThemeColor('surface-foreground');
  const surfaceBg = useThemeColor('surface');

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
        <View className="p-4">
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
      ItemSeparatorComponent={() => <View className="h-3" />}
      ListFooterComponent={() => <View className="h-6" />}
      renderItem={({ item }) => (
        <Link
          href={{ pathname: '/movie/[id]', params: { id: item.id } }}
          asChild
        >
          <Pressable>
            <View className="mx-4 h-35 rounded-xl overflow-hidden" style={{ backgroundColor: surfaceBg }}>
              <View className="flex-row flex-1">
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                  className="w-25 h-35 rounded-tl-xl rounded-bl-xl"
                  resizeMode="cover"
                />
                <View className="flex-1 p-3 justify-between">
                  <Text
                    className="text-base font-semibold"
                    style={{ color: surfaceFgColor, lineHeight: 20 }}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {item.title}
                  </Text>
                  <Text
                    className="text-sm"
                    numberOfLines={3}
                    ellipsizeMode="tail"
                    style={{ color: mutedColor }}
                  >
                    {item.overview}
                  </Text>
                </View>
              </View>
            </View>
          </Pressable>
        </Link>
      )}
    />
  );
};

export default MovieList;
