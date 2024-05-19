import dayjs from 'dayjs';
import { Stack, useLocalSearchParams } from 'expo-router';
import { RefreshControl, useWindowDimensions } from 'react-native';
import { H2, Image, ScrollView, Text, XStack, YStack } from 'tamagui';

import { useGetMovieDetail } from '@/lib/services/tmdb-api/movies/getDetail';

const MovieDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading, mutate } = useGetMovieDetail({
    id,
    isReady: !!id,
  });
  const { width } = useWindowDimensions();

  return (
    <>
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTitle: data?.title,
        }}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={mutate} />
        }
      >
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${data?.backdrop_path}`,
          }}
          height={200}
          resizeMode="cover"
        />
        <YStack gap="$4" padding="$4">
          <XStack gap="$3" alignItems="center">
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${data?.poster_path}`,
              }}
              borderRadius={12}
              height={(2.25 / 5) * width}
              width={(1.5 / 5) * width}
              resizeMode="cover"
            />
            <YStack gap="$2.5" justifyContent="center" flexShrink={1}>
              <H2 fontWeight="800" flexWrap="wrap">
                {data?.title}
              </H2>
              <Text>
                Release Date: {dayjs(data?.release_date).format('DD MMM YYYY')}
              </Text>
            </YStack>
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
