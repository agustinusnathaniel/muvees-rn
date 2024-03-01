import { useMovieListPage } from '@/lib/hooks/movie/useMovieListPage'
import { FlatList } from 'react-native'
import { Card, Spinner, Text, View } from 'tamagui'

export default function TabOneScreen() {
  const { movieListData, isLoadingMovieList } = useMovieListPage()

  return (
    <View width="100%" alignItems="center">
      {isLoadingMovieList ? <Spinner /> : null}
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
    </View>
  )
}
