import { MovieListPageViewModel } from '@/lib/hooks/movie/useMovieListPage'
import { useViewModelContext } from '@/lib/providers/ViewModel'
import { FlatList } from 'react-native'
import { H3, Image, Text, View, XStack } from 'tamagui'
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
        <Card backgroundColor="$gray12" marginHorizontal={24} maxHeight={200}>
          <XStack width="100%">
            <Card.Header gap="$2" width="100%">
              <H3 color="white">{item.title}</H3>
              <Text
                fontSize="$3"
                color="$gray8"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                ellipsizeMode="tail"
                numberOfLines={4}
              >
                {item.overview}
              </Text>
            </Card.Header>

            <Card.Background borderRadius={12} opacity={0.5}>
              <Image
                source={{
                  width: 500,
                  height: 200,
                  uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`,
                }}
                height="100%"
                resizeMode="cover"
                blurRadius={2}
              />
            </Card.Background>
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
