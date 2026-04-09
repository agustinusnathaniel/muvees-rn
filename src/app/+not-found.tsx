import { Link, Stack } from 'expo-router';
import { View, Text } from 'react-native';
import { useThemeColor } from 'heroui-native';

export default function NotFoundScreen() {
  const linkColor = useThemeColor('link');
  const surfaceFgColor = useThemeColor('surface-foreground');

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="flex-1 items-center justify-center p-4">
        <View className="items-center gap-4">
          <Text className="text-2xl font-bold" style={{ color: surfaceFgColor }}>
            This screen doesn't exist.
          </Text>
          <Link href="/" asChild>
            <Text className="text-base underline" style={{ color: linkColor }}>
              Go to home screen!
            </Text>
          </Link>
        </View>
      </View>
    </>
  );
}
