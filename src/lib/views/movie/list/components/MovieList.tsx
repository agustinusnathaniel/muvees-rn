import type { MovieListPageViewModel } from '@/lib/hooks/movie/useMovieListPage'
import { useViewModelContext } from '@/lib/providers/ViewModel'
import { FlatList } from 'react-native'
import { H4, Image, Text, View, XStack } from 'tamagui'
import { Card } from 'tamagui'

const MovieList = () => {
  const { movieListData, isLoadingMovieList, refreshMovieList } =
    useViewModelContext<MovieListPageViewModel>()

  return (
    <FlatList
      data={movieListData?.results}
      // refreshControl={
      //   <RefreshControl refreshing={isLoadingMovieList} onRefresh={refreshMovieList} progressViewOffset={20} />
      // }
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Card backgroundColor="white" marginHorizontal={24} maxHeight={140}>
          <XStack>
            <View overflow="hidden" borderTopLeftRadius={12} borderBottomLeftRadius={12}>
              <Image
                source={{
                  width: 100,
                  height: 140,
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                height="100%"
                resizeMode="cover"
              />
            </View>

            <Card.Header maxWidth="70%" justifyContent="space-between" height="100%">
              <H4 numberOfLines={1} ellipsizeMode="tail">
                {item.title}
              </H4>
              <Text fontSize="$3" color="$gray10" ellipsizeMode="tail" numberOfLines={3}>
                {item.overview}
              </Text>
            </Card.Header>
          </XStack>
        </Card>
      )}
      ListHeaderComponent={() => <View height={20} />}
      ItemSeparatorComponent={() => <View height={20} />}
      ListFooterComponent={() => <View height={20} />}
    />
  )
}

export default MovieList
