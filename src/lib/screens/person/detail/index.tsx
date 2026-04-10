import dayjs from 'dayjs';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { Alert, Button, Card, Chip, Spinner } from 'heroui-native';
import { Star } from 'lucide-react-native';
import {
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { StaggeredGroup } from '@/lib/components/StaggeredGroup';
import { getApiErrorMessage } from '@/lib/services/tmdb-api/error';
import {
  TMDB_IMAGE_SIZES,
  buildTmdbImageUrl,
} from '@/lib/services/tmdb-api/image';
import { useGetPersonCredits } from '@/lib/services/tmdb-api/people/getCredits';
import { useGetPersonDetail } from '@/lib/services/tmdb-api/people/getDetail';

const PersonDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const isReady = !!id;

  const { data, isLoading, isValidating, error, mutate } = useGetPersonDetail({
    id: id ?? '',
    isReady,
  });
  const { data: creditsData } = useGetPersonCredits({
    id: id ?? '',
    isReady,
  });

  const profileUri = buildTmdbImageUrl(
    data?.profile_path,
    TMDB_IMAGE_SIZES.poster,
  );
  const isRefreshing = isValidating && !!data;
  const hasBlockingState = isLoading || Boolean(error);
  const errorMessage = error
    ? getApiErrorMessage(error, 'Pull to refresh or retry below.')
    : null;

  const knownFor = creditsData?.cast.filter((c) => c.poster_path).slice(0, 8);

  const allCredits = [
    ...(creditsData?.cast ?? []),
    ...(creditsData?.crew ?? []),
  ].sort((a, b) => {
    const dateA = a.release_date ?? a.first_air_date ?? '';
    const dateB = b.release_date ?? b.first_air_date ?? '';
    return dateB.localeCompare(dateA);
  });

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: data?.name ?? 'Loading...',
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
                <Alert.Title>Unable to load person</Alert.Title>
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
            <Text className="text-xs text-muted">Refreshing...</Text>
          ) : null}
          {data ? (
            <>
              <StaggeredGroup>
                {/* Profile Card */}
                <Card className="gap-4">
                  <Card.Body className="gap-4">
                    <View className="flex-row items-start gap-3">
                      {profileUri ? (
                        <Image
                          source={{ uri: profileUri }}
                          className="h-40 w-28 rounded-xl"
                          resizeMode="cover"
                          accessible={false}
                        />
                      ) : (
                        <View className="h-40 w-28 items-center justify-center rounded-xl bg-surface-secondary">
                          <Text className="text-center text-xs text-muted">
                            No photo
                          </Text>
                        </View>
                      )}
                      <View className="flex-1 gap-2" style={{ minWidth: 0 }}>
                        <Card.Title className="text-xl leading-6">
                          {data.name}
                        </Card.Title>
                        <Card.Description>
                          {data.known_for_department}
                        </Card.Description>
                        {data.birthday ? (
                          <Card.Description>
                            Born {dayjs(data.birthday).format('DD MMM YYYY')}
                            {data.place_of_birth
                              ? ` in ${data.place_of_birth}`
                              : ''}
                          </Card.Description>
                        ) : null}
                        {data.deathday ? (
                          <Card.Description>
                            Died {dayjs(data.deathday).format('DD MMM YYYY')}
                          </Card.Description>
                        ) : null}
                      </View>
                    </View>

                    {/* Also Known As */}
                    {data.also_known_as.length > 0 ? (
                      <View className="gap-2">
                        <Text className="text-sm font-semibold text-foreground">
                          Also Known As
                        </Text>
                        <View className="flex-row flex-wrap gap-1.5">
                          {data.also_known_as.slice(0, 4).map((aka) => (
                            <Chip key={aka} variant="soft" size="sm">
                              <Chip.Label>{aka}</Chip.Label>
                            </Chip>
                          ))}
                        </View>
                      </View>
                    ) : null}

                    {/* Biography */}
                    {data.biography ? (
                      <Card.Description className="text-base leading-6">
                        {data.biography}
                      </Card.Description>
                    ) : null}
                  </Card.Body>
                </Card>

                {/* Known For */}
                {knownFor && knownFor.length > 0 ? (
                  <View className="gap-3">
                    <Text className="text-lg font-bold text-foreground">
                      Known For
                    </Text>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerClassName="gap-3 pr-4"
                    >
                      {knownFor.map((credit) => {
                        const posterUri = buildTmdbImageUrl(
                          credit.poster_path,
                          TMDB_IMAGE_SIZES.poster,
                        );
                        const title =
                          credit.media_type === 'movie'
                            ? credit.title
                            : credit.name;
                        return (
                          <Link
                            key={credit.id}
                            href={
                              credit.media_type === 'movie'
                                ? {
                                    pathname: '/movie/[id]',
                                    params: { id: credit.id },
                                  }
                                : {
                                    pathname: '/tv/[id]',
                                    params: { id: credit.id },
                                  }
                            }
                            asChild
                          >
                            <Pressable className="w-32 gap-1.5 active:opacity-80">
                              <Image
                                source={{ uri: posterUri }}
                                className="h-48 w-32 rounded-xl"
                                resizeMode="cover"
                                accessible={false}
                              />
                              <Text
                                className="text-xs font-semibold text-foreground"
                                numberOfLines={2}
                              >
                                {title}
                              </Text>
                              <View className="flex-row items-center gap-1">
                                <Star
                                  size={12}
                                  color="rgb(250 204 21)"
                                  fill="rgb(250 204 21)"
                                />
                                <Text className="text-xs text-muted">
                                  {credit.vote_average.toFixed(1)}
                                </Text>
                              </View>
                            </Pressable>
                          </Link>
                        );
                      })}
                    </ScrollView>
                  </View>
                ) : null}

                {/* Filmography */}
                {allCredits.length > 0 ? (
                  <View className="gap-3">
                    <Text className="text-lg font-bold text-foreground">
                      Filmography ({allCredits.length})
                    </Text>
                    {allCredits.map((credit) => {
                      const title =
                        credit.media_type === 'movie'
                          ? credit.title
                          : credit.name;
                      const date =
                        credit.release_date ?? credit.first_air_date ?? '';
                      const posterUri = buildTmdbImageUrl(
                        credit.poster_path,
                        TMDB_IMAGE_SIZES.poster,
                      );
                      const role =
                        'character' in credit
                          ? credit.character
                          : 'job' in credit
                            ? (credit as { job?: string }).job
                            : '';
                      return (
                        <View
                          key={`${credit.id}-${role}-${Math.random()}`}
                          className="gap-1.5"
                        >
                          <Link
                            href={
                              credit.media_type === 'movie'
                                ? {
                                    pathname: '/movie/[id]',
                                    params: { id: credit.id },
                                  }
                                : {
                                    pathname: '/tv/[id]',
                                    params: { id: credit.id },
                                  }
                            }
                            asChild
                          >
                            <Pressable className="flex-row items-center gap-3 active:opacity-80">
                              {posterUri ? (
                                <Image
                                  source={{ uri: posterUri }}
                                  className="h-16 w-12 rounded-lg"
                                  resizeMode="cover"
                                  accessible={false}
                                />
                              ) : (
                                <View className="h-16 w-12 items-center justify-center rounded-lg bg-surface-secondary">
                                  <Text className="text-xs text-muted">
                                    N/A
                                  </Text>
                                </View>
                              )}
                              <View className="flex-1" style={{ minWidth: 0 }}>
                                <Text
                                  className="text-sm font-semibold text-foreground"
                                  numberOfLines={1}
                                >
                                  {title}
                                </Text>
                                <Text
                                  className="text-xs text-muted"
                                  numberOfLines={1}
                                >
                                  {role} ·{' '}
                                  {date ? dayjs(date).format('YYYY') : ''}
                                </Text>
                              </View>
                              <Chip
                                variant="soft"
                                size="sm"
                                className="shrink-0"
                              >
                                <Chip.Label>
                                  {credit.media_type === 'movie' ? '🎬' : '📺'}
                                </Chip.Label>
                              </Chip>
                            </Pressable>
                          </Link>
                        </View>
                      );
                    })}
                  </View>
                ) : null}
              </StaggeredGroup>
            </>
          ) : null}
          {!(data || hasBlockingState) ? (
            <Card className="p-4">
              <Card.Body className="gap-2">
                <Card.Title>Person not found</Card.Title>
                <Card.Description>
                  We couldn&apos;t find this person.
                </Card.Description>
              </Card.Body>
            </Card>
          ) : null}
        </View>
      </ScrollView>
    </>
  );
};

export default PersonDetailScreen;
