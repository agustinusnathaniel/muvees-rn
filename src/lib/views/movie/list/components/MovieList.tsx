import { MovieListPageViewModel } from '@/lib/hooks/movie/useMovieListPage'
import { useViewModelContext } from '@/lib/providers/ViewModel'
import { FlatList, RefreshControl } from 'react-native'
import { Image, Text, View } from 'tamagui'
import { Card } from 'tamagui'

const MovieList = () => {
  const { movieListData, isLoadingMovieList, refreshMovieList } =
    useViewModelContext<MovieListPageViewModel>()

  return (
    <FlatList
      data={movieListData?.results}
      refreshControl={
        <RefreshControl refreshing={isLoadingMovieList} onRefresh={refreshMovieList} />
      }
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Card backgroundColor="$gray1" marginHorizontal={24}>
          <Card.Header>
            <Text fontSize="$8" fontWeight="bold">
              {item.title}
            </Text>
          </Card.Header>
          <Image
            source={{
              height: 200,
              uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`,
            }}
            width="100%"
            height="100%"
          />
          <Text color="$gray10" paddingHorizontal={20} paddingVertical={12}>
            {item.overview}
          </Text>
        </Card>
      )}
      ListHeaderComponent={() => <View height={20} />}
      ItemSeparatorComponent={() => <View height={20} />}
      ListFooterComponent={() => <View height={20} />}
    />
  )
}

export default MovieList
