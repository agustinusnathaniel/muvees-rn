import { MovieListPageViewModel } from '@/lib/hooks/movie/useMovieListPage'
import { useViewModelContext } from '@/lib/providers/ViewModel'
import { FlatList } from 'react-native'
import { Text, View } from 'tamagui'
import { Card } from 'tamagui'

const MovieList = () => {
  const { movieListData } = useViewModelContext<MovieListPageViewModel>()

  return (
    <FlatList
      data={movieListData?.results}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Card backgroundColor="$gray1" marginHorizontal={24}>
          <Card.Header>
            <Text color="$gray11" fontSize="$8" fontWeight="bold">
              {item.title}
            </Text>
          </Card.Header>
          <Text color="$gray9" paddingHorizontal={20} paddingVertical={12}>
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
