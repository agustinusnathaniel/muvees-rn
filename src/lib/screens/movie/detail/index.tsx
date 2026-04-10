import dayjs from 'dayjs';
import * as Linking from 'expo-linking';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import {
  Alert,
  Button,
  Card,
  Chip,
  SkeletonGroup,
  Spinner,
  Tabs,
  useToast,
} from 'heroui-native';
import {
  Bookmark,
  Calendar,
  Clock,
  Globe,
  Play,
  Star,
} from 'lucide-react-native';
import React from 'react';
import {
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  Share,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

import { getApiErrorMessage } from '@/lib/services/tmdb-api/error';
import {
  TMDB_IMAGE_SIZES,
  buildTmdbImageUrl,
} from '@/lib/services/tmdb-api/image';
import { useGetMovieCredits } from '@/lib/services/tmdb-api/movies/getCredits';
import { useGetMovieDetail } from '@/lib/services/tmdb-api/movies/getDetail';
import type {
  CreditPersonType,
  VideoResultType,
} from '@/lib/services/tmdb-api/movies/getDetail/types';
import { useGetSimilarMovies } from '@/lib/services/tmdb-api/movies/getSimilar';
import { useGetMovieVideos } from '@/lib/services/tmdb-api/movies/getVideos';
import { useWatchlist } from '@/lib/services/watchlist/hooks';

const MovieDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const isReady = !!id;

  const { items, toggleItem } = useWatchlist();
  const { toast } = useToast();
  const isInWatchlist = (id: number) => items.some((i) => i.id === id);

  const { data, isLoading, isValidating, error, mutate } = useGetMovieDetail({
    id: id ?? '',
    isReady,
  });
  const { data: creditsData } = useGetMovieCredits({ id: id ?? '', isReady });
  const { data: similarData } = useGetSimilarMovies({ id: id ?? '', isReady });
  const { data: videosData } = useGetMovieVideos({ id: id ?? '', isReady });

  const { width } = useWindowDimensions();

  const posterWidth = (1.5 / 5) * width;
  const posterHeight = (2.25 / 5) * width;
  const backdropUri = buildTmdbImageUrl(
    data?.backdrop_path,
    TMDB_IMAGE_SIZES.backdrop,
  );
  const posterUri = buildTmdbImageUrl(
    data?.poster_path,
    TMDB_IMAGE_SIZES.poster,
  );
  const isRefreshing = isValidating && !!data;
  const hasBlockingState = isLoading || Boolean(error);
  const shouldShowNotFound = !(data || hasBlockingState);
  const errorMessage = error
    ? getApiErrorMessage(error, 'Pull to refresh or retry below.')
    : null;

  const topCast = creditsData?.cast
    .filter((c: CreditPersonType) => c.profile_path)
    .sort(
      (a: CreditPersonType, b: CreditPersonType) =>
        (a.order ?? 999) - (b.order ?? 999),
    )
    .slice(0, 10);

  const director = creditsData?.crew.find(
    (c: CreditPersonType) => c.job === 'Director',
  );

  const trailer =
    videosData?.results.find(
      (v: VideoResultType) =>
        v.type === 'Trailer' && v.site === 'YouTube' && v.official,
    ) ??
    videosData?.results.find(
      (v: VideoResultType) => v.site === 'YouTube' && v.official,
    );

  const similarMovies = similarData?.results.slice(0, 6) ?? [];

  const runtimeHours = data?.runtime ? Math.floor(data.runtime / 60) : null;
  const runtimeMins = data?.runtime ? data.runtime % 60 : null;

  const handleShare = async () => {
    if (!data) return;
    await Share.share({
      message: `${data.title} (${data.release_date ? dayjs(data.release_date).format('YYYY') : ''})\n\n${data.overview}`,
    });
  };

  const handleWatchlistToggle = () => {
    if (!data) return;
    const wasAdded = toggleItem({
      id: data.id,
      title: data.title,
      poster_path: data.poster_path,
      vote_average: data.vote_average,
      release_date: data.release_date,
    });
    toast.show({
      variant: wasAdded ? 'success' : 'default',
      label: wasAdded ? 'Added to watchlist' : 'Removed from watchlist',
      description: data.title,
    });
  };

  const openTrailer = () => {
    if (!trailer) return;
    const url = `https://www.youtube.com/watch?v=${trailer.key}`;
    void Linking.openURL(url);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: data?.title ?? 'Loading...',
          headerRight: data
            ? () => (
                <View className="flex-row items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onPress={handleWatchlistToggle}
                  >
                    {isInWatchlist(data.id) ? (
                      <Bookmark
                        size={18}
                        fill="rgb(59 130 246)"
                        color="rgb(59 130 246)"
                      />
                    ) : (
                      <Bookmark size={18} color="rgb(163 163 163)" />
                    )}
                  </Button>
                  <Button variant="ghost" size="sm" onPress={handleShare}>
                    <Button.Label>Share</Button.Label>
                  </Button>
                </View>
              )
            : undefined,
        }}
      />
      <ScrollView
        className="flex-1 bg-background"
        contentContainerClassName="pb-8"
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => void mutate()}
          />
        }
      >
        <View className="gap-4 p-4">
          {isLoading && !data ? (
            <View className="items-center justify-center py-12">
              <Spinner size="lg" />
            </View>
          ) : null}
          {error ? (
            <Alert status="danger">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>Unable to load this movie</Alert.Title>
                <Alert.Description>
                  {errorMessage ?? 'Pull to refresh or retry below.'}
                </Alert.Description>
              </Alert.Content>
              <Button size="sm" variant="danger" onPress={() => void mutate()}>
                Retry
              </Button>
            </Alert>
          ) : null}
          {isRefreshing ? (
            <Text className="text-xs text-muted">
              Refreshing movie details...
            </Text>
          ) : null}
          {data ? (
            <>
              {/* Backdrop */}
              {backdropUri ? (
                <Image
                  source={{ uri: backdropUri }}
                  className="h-52 w-full rounded-2xl"
                  resizeMode="cover"
                  accessibilityRole="image"
                  accessibilityLabel={`${data.title} backdrop`}
                />
              ) : (
                <View className="h-52 w-full items-center justify-center rounded-2xl bg-surface-secondary">
                  <Text className="text-sm text-muted">
                    Backdrop unavailable
                  </Text>
                </View>
              )}

              {/* Trailer Button */}
              {trailer ? (
                <Button variant="outline" size="md" onPress={openTrailer}>
                  <Play size={16} />
                  <Button.Label>Watch Trailer</Button.Label>
                </Button>
              ) : null}

              {/* Movie Info Card */}
              <Card className="gap-4">
                <Card.Body className="gap-4">
                  <View className="flex-row items-start gap-3">
                    {posterUri ? (
                      <Image
                        source={{ uri: posterUri }}
                        className="rounded-xl"
                        style={{ width: posterWidth, height: posterHeight }}
                        resizeMode="cover"
                        accessible={false}
                      />
                    ) : (
                      <View
                        className="items-center justify-center rounded-xl bg-surface-secondary px-2"
                        style={{ width: posterWidth, height: posterHeight }}
                      >
                        <Text className="text-center text-xs text-muted">
                          No poster
                        </Text>
                      </View>
                    )}
                    <View
                      className="flex-1 justify-center gap-2"
                      style={{ minWidth: 0 }}
                    >
                      <Card.Title
                        className="text-2xl leading-7"
                        numberOfLines={3}
                      >
                        {data.title}
                      </Card.Title>
                      {data.tagline ? (
                        <Card.Description className="italic" numberOfLines={2}>
                          {data.tagline}
                        </Card.Description>
                      ) : null}
                      {data.release_date ? (
                        <Card.Description>
                          {dayjs(data.release_date).format('DD MMM YYYY')}
                        </Card.Description>
                      ) : null}
                    </View>
                  </View>

                  {/* Genres */}
                  {data.genres?.length ? (
                    <View className="flex-row flex-wrap gap-2">
                      {data.genres.map((genre) => (
                        <Chip
                          key={genre.id}
                          variant="soft"
                          color="accent"
                          size="sm"
                          accessibilityRole="text"
                          accessibilityLabel={`Genre ${genre.name}`}
                        >
                          <Chip.Label>{genre.name}</Chip.Label>
                        </Chip>
                      ))}
                    </View>
                  ) : null}

                  {/* Rating & Runtime Row */}
                  <View className="flex-row flex-wrap items-center gap-4">
                    <View className="flex-row items-center gap-1.5">
                      <Star
                        size={16}
                        color="rgb(250 204 21)"
                        fill="rgb(250 204 21)"
                      />
                      <Text className="text-sm font-semibold text-foreground">
                        {data.vote_average.toFixed(1)}
                      </Text>
                      <Text className="text-xs text-muted">
                        ({data.vote_count.toLocaleString()})
                      </Text>
                    </View>
                    {data.runtime ? (
                      <View className="flex-row items-center gap-1.5">
                        <Clock size={14} color="rgb(163 163 163)" />
                        <Text className="text-sm text-foreground">
                          {runtimeHours ? `${runtimeHours}h ` : ''}
                          {runtimeMins ?? 0}m
                        </Text>
                      </View>
                    ) : null}
                    {director ? (
                      <View className="flex-row items-center gap-1.5">
                        <Globe size={14} color="rgb(163 163 163)" />
                        <Text
                          className="text-sm text-foreground"
                          numberOfLines={1}
                        >
                          Dir: {director.name}
                        </Text>
                      </View>
                    ) : null}
                  </View>

                  {/* Status & Language */}
                  <View className="flex-row flex-wrap gap-x-4 gap-y-1">
                    <View className="flex-row items-center gap-1.5">
                      <Calendar size={14} color="rgb(163 163 163)" />
                      <Text className="text-xs text-muted">{data.status}</Text>
                    </View>
                    {data.original_language ? (
                      <View className="flex-row items-center gap-1.5">
                        <Globe size={14} color="rgb(163 163 163)" />
                        <Text className="text-xs text-muted uppercase">
                          {data.original_language}
                        </Text>
                      </View>
                    ) : null}
                  </View>

                  {/* Overview */}
                  <Card.Description className="text-base leading-6">
                    {data.overview || 'No overview available yet.'}
                  </Card.Description>
                </Card.Body>
              </Card>

              {/* Tabbed Content: Cast & Similar */}
              {topCast?.length || similarMovies.length ? (
                <DetailTabs cast={topCast ?? []} similar={similarMovies} />
              ) : null}
            </>
          ) : null}
          {shouldShowNotFound ? (
            <Card className="p-4">
              <Card.Body className="gap-2">
                <Card.Title>Movie not found</Card.Title>
                <Card.Description>
                  We couldn&apos;t find the requested movie.
                </Card.Description>
              </Card.Body>
            </Card>
          ) : null}
        </View>
      </ScrollView>
    </>
  );
};

type DetailTabsProps = {
  cast: Array<CreditPersonType>;
  similar: Array<{
    id: number;
    title: string;
    poster_path?: string | null;
    vote_average: number;
  }>;
};

const DetailTabs = ({ cast, similar }: DetailTabsProps) => {
  const [activeTab, setActiveTab] = React.useState<'cast' | 'similar'>('cast');
  const hasCast = cast.length > 0;
  const hasSimilar = similar.length > 0;

  if (!(hasCast || hasSimilar)) return null;

  return (
    <Tabs
      value={activeTab}
      onValueChange={(v: string) => setActiveTab(v as 'cast' | 'similar')}
    >
      <Tabs.List>
        <Tabs.ScrollView>
          <Tabs.Indicator />
          {hasCast ? (
            <Tabs.Trigger value="cast">
              <Tabs.Label>Cast</Tabs.Label>
            </Tabs.Trigger>
          ) : null}
          {hasSimilar ? (
            <Tabs.Trigger value="similar">
              <Tabs.Label>Similar</Tabs.Label>
            </Tabs.Trigger>
          ) : null}
        </Tabs.ScrollView>
      </Tabs.List>

      {hasCast ? (
        <Tabs.Content value="cast">
          <View className="mt-3 gap-3">
            <SkeletonGroup isLoading={false}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="max-h-40"
                contentContainerClassName="gap-3 pr-4"
              >
                {cast.map((person) => {
                  const profileUri = buildTmdbImageUrl(
                    person.profile_path,
                    TMDB_IMAGE_SIZES.profile,
                  );
                  return (
                    <View key={person.id} className="w-20 gap-1.5">
                      {profileUri ? (
                        <Image
                          source={{ uri: profileUri }}
                          className="h-24 w-20 rounded-xl"
                          resizeMode="cover"
                          accessible={false}
                        />
                      ) : (
                        <View className="h-24 w-20 items-center justify-center rounded-xl bg-surface-secondary">
                          <Text className="text-xs text-muted">N/A</Text>
                        </View>
                      )}
                      <Text
                        className="text-xs font-semibold text-foreground"
                        numberOfLines={1}
                      >
                        {person.name}
                      </Text>
                      {person.character ? (
                        <Text className="text-xs text-muted" numberOfLines={1}>
                          {person.character}
                        </Text>
                      ) : null}
                    </View>
                  );
                })}
              </ScrollView>
            </SkeletonGroup>
          </View>
        </Tabs.Content>
      ) : null}

      {hasSimilar ? (
        <Tabs.Content value="similar">
          <View className="mt-3 gap-3">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="gap-3 pr-4"
            >
              {similar.map((movie) => {
                const posterUri = buildTmdbImageUrl(
                  movie.poster_path,
                  TMDB_IMAGE_SIZES.poster,
                );
                return (
                  <Link
                    key={movie.id}
                    href={{ pathname: '/movie/[id]', params: { id: movie.id } }}
                    asChild
                  >
                    <Pressable className="w-32 gap-1.5 active:opacity-80">
                      {posterUri ? (
                        <Image
                          source={{ uri: posterUri }}
                          className="h-48 w-32 rounded-xl"
                          resizeMode="cover"
                          accessible={false}
                        />
                      ) : (
                        <View className="h-48 w-32 items-center justify-center rounded-xl bg-surface-secondary">
                          <Text className="text-xs text-muted">N/A</Text>
                        </View>
                      )}
                      <Text
                        className="text-xs font-semibold text-foreground"
                        numberOfLines={2}
                      >
                        {movie.title}
                      </Text>
                      <View className="flex-row items-center gap-1">
                        <Star
                          size={12}
                          color="rgb(250 204 21)"
                          fill="rgb(250 204 21)"
                        />
                        <Text className="text-xs text-muted">
                          {movie.vote_average.toFixed(1)}
                        </Text>
                      </View>
                    </Pressable>
                  </Link>
                );
              })}
            </ScrollView>
          </View>
        </Tabs.Content>
      ) : null}
    </Tabs>
  );
};

export default MovieDetailScreen;
