import { Link, Stack } from 'expo-router';
import { View, Text } from 'react-native';
import { Button } from 'heroui-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="flex-1 items-center justify-center p-4">
        <View className="items-center gap-4">
          <Text className="text-center text-2xl font-bold text-foreground">
            This screen doesn't exist.
          </Text>
          <Link href="/" asChild>
            <Button variant="secondary">
              <Button.Label>Go to home screen</Button.Label>
            </Button>
          </Link>
        </View>
      </View>
    </>
  );
}
