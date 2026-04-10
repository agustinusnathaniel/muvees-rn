import { FlashList } from '@shopify/flash-list';
import {
  Alert,
  Button,
  Card,
  SearchField,
  SkeletonGroup,
  Spinner,
} from 'heroui-native';
import { useCallback, useState } from 'react';
import { Text, View } from 'react-native';

import { MovieCard } from '@/lib/components/MovieCard';
import { getApiErrorMessage } from '@/lib/services/tmdb-api/error';
import { useGetMovieList } from '@/lib/services/tmdb-api/movies/getList';

const loadingSkeletonKeys = ['1', '2', '3', '4'];

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const isReady = searchTerm.length >= 2;
  const { data, isLoading, isValidating, error, mutate } = useGetMovieList({
    section: 'popular',
    params: { query: isReady ? searchTerm : undefined },
    isReady,
  });

  const hasBlockingState = isLoading && !data;
  const isRefreshing = isValidating && !!data;
  const errorMessage = error
    ? getApiErrorMessage(error, 'Try searching for a different movie.')
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

  return (
    <View className="flex-1 bg-background">
      {/* Search Header */}
      <View className="border-b border-surface-secondary px-4 py-3">
        <SearchField value={query} onChange={handleSearch}>
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input
              placeholder="Search movies..."
              onSubmitEditing={handleSearchSubmit}
              returnKeyType="search"
            />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>
      </View>

      {/* Results List */}
      <FlashList
        data={data?.results ?? []}
        extraData={data?.results}
        ListHeaderComponent={() => (
          <View className="gap-3 p-4">
            {/* Initial State */}
            {!(searchTerm || hasBlockingState) ? (
              <Card className="p-6">
                <Card.Body className="items-center gap-3">
                  <Text className="text-lg font-bold text-foreground">
                    Search Movies
                  </Text>
                  <Text className="text-center text-sm text-muted">
                    Type a movie title above and press search to find movies.
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
                    We couldn&apos;t find any movies matching &ldquo;
                    {searchTerm}
                    &rdquo;
                  </Text>
                </Card.Body>
              </Card>
            ) : null}
          </View>
        )}
        ListFooterComponent={() => <View className="h-6" />}
        renderItem={({ item }) => (
          <MovieCard
            id={item.id}
            title={item.title}
            posterPath={item.poster_path}
            description={item.overview || 'No synopsis available.'}
          />
        )}
      />
    </View>
  );
};

export default SearchScreen;
