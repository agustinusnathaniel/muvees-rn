import { FlashList } from '@shopify/flash-list';
import { Link } from 'expo-router';
import {
  Alert,
  Button,
  Card,
  SearchField,
  SkeletonGroup,
  Spinner,
} from 'heroui-native';
import { User } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import { MovieCard } from '@/lib/components/MovieCard';
import { TvShowCard } from '@/lib/components/TvShowCard';
import { getApiErrorMessage } from '@/lib/services/tmdb-api/error';
import {
  TMDB_IMAGE_SIZES,
  buildTmdbImageUrl,
} from '@/lib/services/tmdb-api/image';
import { useMultiSearch } from '@/lib/services/tmdb-api/search/multi';
import type {
  MultiSearchMovieResult,
  MultiSearchPersonResult,
  MultiSearchTvResult,
} from '@/lib/services/tmdb-api/search/multi/types';

const loadingSkeletonKeys = ['1', '2', '3', '4'];

type MultiResult =
  | MultiSearchMovieResult
  | MultiSearchTvResult
  | MultiSearchPersonResult;

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const isReady = searchTerm.length >= 2;
  const { data, isLoading, isValidating, error, mutate } = useMultiSearch({
    query: isReady ? searchTerm : '',
    isReady,
  });

  const hasBlockingState = isLoading && !data;
  const isRefreshing = isValidating && !!data;
  const errorMessage = error
    ? getApiErrorMessage(error, 'Try searching for something else.')
    : null;

  const handleSearch = useCallback((text: string) => {
    setQuery(text);
  }, []);

  const handleSearchSubmit = useCallback(() => {
    const trimmed = query.trim();
    if (trimmed.length >= 2) {
      setSearchTerm(trimmed);
    }
  }, [query]);

  const renderResult = ({ item }: { item: MultiResult }) => {
    if (item.media_type === 'person') {
      return <PersonCard person={item} />;
    }
    if (item.media_type === 'movie') {
      return (
        <MovieCard
          id={item.id}
          title={item.title}
          posterPath={item.poster_path}
          description={item.overview || 'No overview available.'}
        />
      );
    }
    return (
      <TvShowCard
        id={item.id}
        name={item.name}
        posterPath={item.poster_path}
        description={item.overview || 'No overview available.'}
      />
    );
  };

  return (
    <View className="flex-1 bg-background">
      {/* Search Header */}
      <View className="border-b border-surface-secondary px-4 py-3">
        <SearchField value={query} onChange={handleSearch}>
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input
              placeholder="Search movies, TV shows, people..."
              onSubmitEditing={handleSearchSubmit}
              returnKeyType="search"
            />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>
      </View>

      {/* Results List */}
      <FlashList
        data={(data?.results ?? []) as Array<MultiResult>}
        extraData={data?.results}
        ListHeaderComponent={() => (
          <View className="gap-3 p-4">
            {/* Initial State */}
            {!(searchTerm || hasBlockingState) ? (
              <Card className="p-6">
                <Card.Body className="items-center gap-3">
                  <Text className="text-lg font-bold text-foreground">
                    Search Anything
                  </Text>
                  <Text className="text-center text-sm text-muted">
                    Search across movies, TV shows, and people.
                  </Text>
                </Card.Body>
              </Card>
            ) : null}

            {/* Loading State */}
            {hasBlockingState ? (
              <View className="gap-3">
                {loadingSkeletonKeys.map((key) => (
                  <SkeletonGroup key={key} isLoading className="h-35">
                    <Card className="h-35 flex-row overflow-hidden p-0">
                      <SkeletonGroup.Item className="h-full w-25 rounded-l-xl" />
                      <Card.Body className="flex-1 justify-between p-3">
                        <View className="gap-2">
                          <SkeletonGroup.Item className="h-4 w-11/12 rounded-md" />
                          <SkeletonGroup.Item className="h-4 w-8/12 rounded-md" />
                        </View>
                        <View className="gap-2">
                          <SkeletonGroup.Item className="h-3 w-full rounded-md" />
                          <SkeletonGroup.Item className="h-3 w-10/12 rounded-md" />
                          <SkeletonGroup.Item className="h-3 w-7/12 rounded-md" />
                        </View>
                      </Card.Body>
                    </Card>
                  </SkeletonGroup>
                ))}
              </View>
            ) : null}

            {/* Error State */}
            {error ? (
              <Alert status="danger">
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Title>Search failed</Alert.Title>
                  <Alert.Description>
                    {errorMessage ?? 'Please try again.'}
                  </Alert.Description>
                </Alert.Content>
                <Button
                  size="sm"
                  variant="danger"
                  onPress={() => void mutate()}
                >
                  Retry
                </Button>
              </Alert>
            ) : null}

            {/* Refreshing indicator */}
            {isRefreshing ? (
              <View className="items-center py-2">
                <Spinner size="sm" />
                <Text className="ml-2 text-xs text-muted">Refreshing...</Text>
              </View>
            ) : null}

            {/* No results */}
            {data?.results.length === 0 ? (
              <Card className="p-6">
                <Card.Body className="items-center gap-3">
                  <Text className="text-base font-semibold text-foreground">
                    No results found
                  </Text>
                  <Text className="text-center text-sm text-muted">
                    We couldn&apos;t find anything matching &ldquo;{searchTerm}
                    &rdquo;
                  </Text>
                </Card.Body>
              </Card>
            ) : null}
          </View>
        )}
        ListFooterComponent={() => <View className="h-6" />}
        renderItem={renderResult}
      />
    </View>
  );
};

const PersonCard = ({ person }: { person: MultiSearchPersonResult }) => {
  const profileUri = buildTmdbImageUrl(
    person.profile_path,
    TMDB_IMAGE_SIZES.poster,
  );

  const knownForTitles = person.known_for
    .filter((k) => k.title ?? k.name)
    .slice(0, 3)
    .map((k) => k.title ?? k.name)
    .join(', ');

  return (
    <View className="gap-1.5">
      <Link
        href={{ pathname: '/person/[id]', params: { id: person.id } }}
        asChild
      >
        <Pressable className="mx-4 active:opacity-90">
          <Card className="h-22 flex-row items-center gap-3 overflow-hidden p-0">
            {profileUri ? (
              <Image
                source={{ uri: profileUri }}
                className="h-22 w-16 rounded-l-xl"
                resizeMode="cover"
                accessible={false}
              />
            ) : (
              <View className="h-22 w-16 items-center justify-center rounded-l-xl bg-surface-secondary">
                <User size={20} color="rgb(163 163 163)" />
              </View>
            )}
            <Card.Body className="flex-1 justify-center gap-1 p-3">
              <View className="flex-row items-center gap-1.5">
                <User size={14} color="rgb(163 163 163)" />
                <Card.Title className="text-base leading-5" numberOfLines={1}>
                  {person.name}
                </Card.Title>
              </View>
              <Card.Description className="text-xs" numberOfLines={1}>
                {person.known_for_department}
                {knownForTitles ? ` · ${knownForTitles}` : ''}
              </Card.Description>
            </Card.Body>
          </Card>
        </Pressable>
      </Link>
    </View>
  );
};

export default SearchScreen;
