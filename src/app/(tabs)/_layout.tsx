import { Link, Tabs } from "expo-router";
import { Button, Text } from "tamagui";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "#4e4e4e",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Tab One",
          tabBarIcon: ({ color }) => <Text>Hello! {color}</Text>,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Button size="$2" chromeless>
                Press Me!
              </Button>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Tab Two",
          tabBarIcon: ({ color }) => <Text>Hello! {color}</Text>,
        }}
      />
    </Tabs>
  );
}
