import { Input, Label, View, YStack } from 'tamagui'

export default function TabTwoScreen() {
  return (
    <View flex={1} alignItems="center">
      <YStack padding={24} gap={16} fullscreen>
        <YStack>
          <Label>Name</Label>
          <Input placeholder="Hello" />
        </YStack>
        <YStack>
          <Label>Password</Label>
          <Input secureTextEntry placeholder="Hello" />
        </YStack>
      </YStack>
    </View>
  )
}
