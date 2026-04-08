import dayjs from 'dayjs';
import { Stack, useLocalSearchParams } from 'expo-router';
import { RefreshControl, useWindowDimensions } from 'react-native';
import { H2, Image, ScrollView, Text, XStack, YStack } from 'tamagui';

import { useGetMovieDetail } from '@/lib/services/tmdb-api/movies/getDetail';

const MovieDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading, mutate } = useGetMovieDetail({
    id: id ?? '',
    isReady: !!id,
  });
  const { width } = useWindowDimensions();

  const posterWidth = (1.5 / 5) * width;
  const posterHeight = (2.25 / 5) * width;

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: data?.title ?? 'Loading...',
        }}
      />
      <ScrollView
        flex={1}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={mutate} />
        }
      >
        <YStack gap="$0">
          <Image
            src={`https://image.tmdb.org/t/p/w500${data?.backdrop_path}`}
            width="100%"
            height={200}
            objectFit="cover"
          />
          <YStack gap="$4" p="$4">
            <XStack gap="$3" items="flex-start">
              <Image
                src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
                borderRadius={12}
                height={posterHeight}
                width={posterWidth}
                objectFit="cover"
              />
              <YStack gap="$2.5" justify="center" flex={1} minW={0}>
                <H2 fontWeight="800" lineHeight={28}>
                  {data?.title}
                </H2>
                {data?.release_date ? (
                  <Text fontSize="$4" color="$gray11">
                    Release: {dayjs(data?.release_date).format('DD MMM YYYY')}
                  </Text>
                ) : null}
              </YStack>
            </XStack>

            <XStack gap="$2.5" flexWrap="wrap">
              {data?.genres.map((genre) => (
                <Text
                  key={genre.id}
                  // borderRadius="$4"
                  bg="$blue4"
                  p="$1.5"
                  fontSize="$3"
                >
                  {genre.name}
                </Text>
              ))}
            </XStack>
            <Text fontSize="$5" color="$gray11" lineHeight="$6">
              {data?.overview}
            </Text>
          </YStack>
        </YStack>
      </ScrollView>
    </>
  );
};

export default MovieDetailScreen;
