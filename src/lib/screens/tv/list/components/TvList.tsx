import { FlashList } from '@shopify/flash-list';
import { Card, SkeletonGroup } from 'heroui-native';
import { RefreshControl, Text, View } from 'react-native';

import { SelectInput } from '@/lib/components/SelectInput';
import { TvShowCard } from '@/lib/components/TvShowCard';
import { useViewModelContext } from '@/lib/providers/ViewModel';
import type { TvListPageViewModel } from '@/lib/screens/tv/list/hooks';
import type { TvListType } from '@/lib/services/tmdb-api/tv/getList/types';

const sectionOptions: Array<{ label: string; value: TvListType }> = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'On The Air', value: 'on_the_air' },
  { label: 'Airing Today', value: 'airing_today' },
];

const loadingSkeletonKeys = ['1', '2', '3', '4'];

const TvList = () => {
  const {
    tvListData,
    isInitialLoadingTvList,
    isRefreshingTvList,
    tvListError,
    refreshTvList,
    section,
    setSection,
  } = useViewModelContext<TvListPageViewModel>();

  return (
    <FlashList
      data={tvListData?.results}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshingTvList}
          onRefresh={() => void refreshTvList()}
        />
      }
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={() => (
        <View className="gap-2 p-4">
          <SelectInput
            options={sectionOptions}
            getOptionLabel={(item) => item.label}
            getOptionValue={(item) => item.value}
            value={section}
            onValueChange={(item) => setSection(item as TvListType)}
            searchable
          />
          {isRefreshingTvList ? (
            <Text className="text-xs text-muted">
              Refreshing TV show list...
            </Text>
          ) : null}
        </View>
      )}
      ItemSeparatorComponent={() => <View className="h-3" />}
      ListFooterComponent={() => <View className="h-6" />}
      ListEmptyComponent={() => (
        <View className="px-4">
          {tvListError ? null : isInitialLoadingTvList ? (
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
          ) : (
            <Card className="p-4">
              <Card.Body className="gap-2">
                <Card.Title>No TV shows found</Card.Title>
                <Card.Description>
                  Try switching categories or pull to refresh.
                </Card.Description>
              </Card.Body>
            </Card>
          )}
        </View>
      )}
      renderItem={({ item }) => (
        <TvShowCard
          id={item.id}
          name={item.name}
          posterPath={item.poster_path}
          description={item.overview || 'No synopsis available.'}
        />
      )}
    />
  );
};

export default TvList;
