import { FlashList } from '@shopify/flash-list';
import dayjs from 'dayjs';
import { Button } from 'heroui-native';
import { Bookmark, Trash2 } from 'lucide-react-native';
import { Alert, Text, View } from 'react-native';

import { MovieCard } from '@/lib/components/MovieCard';
import { useWatchlist } from '@/lib/services/watchlist/hooks';

const WatchlistScreen = () => {
  const items = useWatchlist((s) => s.items);
  const removeItem = useWatchlist((s) => s.removeItem);
  const clearItems = useWatchlist((s) => s.clearItems);

  const handleClearAll = () => {
    Alert.alert('Clear Watchlist', 'Remove all movies from your watchlist?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear All', style: 'destructive', onPress: clearItems },
    ]);
  };

  if (items.length === 0) {
    return (
      <View className="flex-1 bg-background p-4">
        <View className="flex-1 items-center justify-center gap-4">
          <Bookmark size={48} color="rgb(163 163 163)" />
          <Text className="text-lg font-bold text-foreground">
            Your watchlist is empty
          </Text>
          <Text className="text-center text-sm text-muted">
            Browse movies and add them to your watchlist to keep track of what
            you want to watch.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center justify-between border-b border-surface-secondary px-4 py-3">
        <Text className="text-sm font-semibold text-foreground">
          {items.length} movie{items.length !== 1 ? 's' : ''}
        </Text>
        <Button variant="ghost" size="sm" onPress={handleClearAll}>
          <Trash2 size={14} />
          <Button.Label>Clear all</Button.Label>
        </Button>
      </View>

      {/* List */}
      <FlashList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center gap-4 px-4 pt-12">
            <Bookmark size={48} color="rgb(163 163 163)" />
            <Text className="text-lg font-bold text-foreground">
              Your watchlist is empty
            </Text>
            <Text className="text-center text-sm text-muted">
              Browse movies and add them to your watchlist.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <MovieCard
            id={item.id}
            title={item.title}
            posterPath={item.poster_path}
            description={
              item.release_date
                ? dayjs(item.release_date).format('DD MMM YYYY')
                : 'No release date'
            }
            footer={
              <Button
                variant="ghost"
                size="sm"
                className="self-end"
                onPress={() => removeItem(item.id)}
              >
                <Trash2 size={12} />
                <Button.Label>Remove</Button.Label>
              </Button>
            }
          />
        )}
      />
    </View>
  );
};

export default WatchlistScreen;
