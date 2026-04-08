import { Link, Stack } from 'expo-router';
import { H2, Text, YStack } from 'tamagui';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <YStack flex={1} items="center" justify="center" p="$4">
        <YStack items="center" gap="$4">
          <H2>This screen doesn't exist.</H2>
          <Link href="/" asChild>
            <Text
              fontSize="$5"
              color="$blue10"
              textDecorationLine="underline"
            >
              Go to home screen!
            </Text>
          </Link>
        </YStack>
      </YStack>
    </>
  );
}
