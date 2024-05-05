import { useGetMovieDetail } from '@/lib/services/tmdb-api/movies/getDetail';
import dayjs from 'dayjs';
import { Stack, useLocalSearchParams } from 'expo-router';
import { RefreshControl } from 'react-native';
import { H2, Image, ScrollView, Text, XStack, YStack } from 'tamagui';

const MovieDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading, mutate } = useGetMovieDetail({
    id,
    isReady: !!id,
  });

  return (
    <>
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTitle: `Detail - ${data?.title}`,
        }}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={mutate} />
        }
      >
        <YStack gap="$4" padding="$4">
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${data?.poster_path}`,
            }}
            borderRadius={12}
            height={200}
            resizeMode="cover"
          />
          <H2 fontWeight="800">{data?.title}</H2>
          <XStack>
            <Text>
              Release Date: {dayjs(data?.release_date).format('DD MMM YYYY')}
            </Text>
          </XStack>
          <XStack gap="$2.5">
            {data?.genres.map((genre) => (
              <Text
                key={genre.id}
                borderRadius="$4"
                backgroundColor="$blue4"
                padding="$1.5"
              >
                {genre.name}
              </Text>
            ))}
          </XStack>
          <Text fontSize="$6" fontWeight="600">
            {data?.overview}
          </Text>
        </YStack>
      </ScrollView>
    </>
  );
};

export default MovieDetailScreen;
