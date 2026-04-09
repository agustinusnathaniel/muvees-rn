import dayjs from 'dayjs';
import { Stack, useLocalSearchParams } from 'expo-router';
import { RefreshControl, useWindowDimensions, ScrollView, View, Image, Text } from 'react-native';
import { useThemeColor } from 'heroui-native';

import { useGetMovieDetail } from '@/lib/services/tmdb-api/movies/getDetail';

const MovieDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading, mutate } = useGetMovieDetail({
    id: id ?? '',
    isReady: !!id,
  });
  const { width } = useWindowDimensions();
  const mutedColor = useThemeColor('muted');
  const accentColor = useThemeColor('accent');
  const surfaceFgColor = useThemeColor('surface-foreground');

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
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={mutate} />
        }
      >
        <View>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${data?.backdrop_path}` }}
            className="w-full h-50"
            resizeMode="cover"
          />
          <View className="gap-4 p-4">
            <View className="flex-row gap-3 items-start">
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${data?.poster_path}` }}
                className="rounded-xl"
                style={{ width: posterWidth, height: posterHeight }}
                resizeMode="cover"
              />
              <View className="gap-2.5 justify-center flex-1" style={{ minWidth: 0 }}>
                <Text className="text-2xl font-extrabold" style={{ color: surfaceFgColor, lineHeight: 28 }}>
                  {data?.title}
                </Text>
                {data?.release_date ? (
                  <Text className="font-normal" style={{ color: mutedColor }}>
                    Release: {dayjs(data?.release_date).format('DD MMM YYYY')}
                  </Text>
                ) : null}
              </View>
            </View>

            <View className="flex-row flex-wrap gap-2.5">
              {data?.genres?.map((genre) => (
                <Text
                  key={genre.id}
                  className="px-1.5 py-1 text-sm rounded-md"
                  style={{
                    backgroundColor: `${accentColor}33`,
                    color: accentColor,
                  }}
                >
                  {genre.name}
                </Text>
              ))}
            </View>
            <Text className="text-base leading-6" style={{ color: mutedColor }}>
              {data?.overview}
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default MovieDetailScreen;
