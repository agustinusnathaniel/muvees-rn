import { Card, Text, View, YStack } from 'tamagui'

export default function TabOneScreen() {
  return (
    <View flex={1} alignItems="center">
      <YStack padding={24} gap={16} fullscreen>
        <Card backgroundColor="$orange4">
          <Card.Header>
            <Text>Hello</Text>
          </Card.Header>
        </Card>
      </YStack>
    </View>
  )
}
