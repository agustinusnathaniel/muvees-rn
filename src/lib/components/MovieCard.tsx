import { Link } from 'expo-router';
import { Card } from 'heroui-native';
import { Image, Pressable, Text, View } from 'react-native';

import {
  TMDB_IMAGE_SIZES,
  buildTmdbImageUrl,
} from '@/lib/services/tmdb-api/image';

type MovieCardProps = {
  id: number;
  title: string;
  posterPath?: string | null;
  description: string;
  onPress?: () => void;
  footer?: React.ReactNode;
};

export const MovieCard = ({
  id,
  title,
  posterPath,
  description,
  footer,
}: MovieCardProps) => {
  const posterUri = buildTmdbImageUrl(posterPath, TMDB_IMAGE_SIZES.poster);

  const card = (
    <Pressable
      className="mx-4 active:opacity-90"
      hitSlop={6}
      accessibilityRole="button"
      accessibilityLabel={`Open details for ${title}`}
      accessibilityHint="Navigates to the movie details screen"
    >
      <Card className="h-35 flex-row overflow-hidden p-0">
        {posterUri ? (
          <Image
            source={{ uri: posterUri }}
            className="h-35 w-25 rounded-l-xl"
            resizeMode="cover"
            accessible={false}
          />
        ) : (
          <View className="h-35 w-25 items-center justify-center rounded-l-xl bg-surface-secondary px-2">
            <Text className="text-center text-xs text-muted">No poster</Text>
          </View>
        )}
        <Card.Body className="flex-1 justify-between p-3">
          <Card.Title
            className="text-base leading-5"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {title}
          </Card.Title>
          <Card.Description
            className="text-sm"
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {description || 'No synopsis available.'}
          </Card.Description>
        </Card.Body>
      </Card>
    </Pressable>
  );

  return (
    <View className="gap-1.5">
      <Link href={{ pathname: '/movie/[id]', params: { id } }} asChild>
        {card}
      </Link>
      {footer}
    </View>
  );
};
