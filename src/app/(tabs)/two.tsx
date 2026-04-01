import { Input, Label, View, YStack } from 'tamagui';

export default function TabTwoScreen() {
  return (
    <View flex={1} alignItems="center">
      <YStack paddingHorizontal={24} fullscreen>
        <YStack>
          <Label>Name</Label>
          <Input placeholder="Hello" />
        </YStack>
        <YStack>
          <Label>Password</Label>
          <Input type="password" placeholder="Hello" />
        </YStack>
        {/* <YStack>
          <Label>E-Mail</Label>
          <Input
            textContentType="password"
            type="password"
            placeholder="Hello"
          />
        </YStack> */}
      </YStack>
    </View>
  );
}
