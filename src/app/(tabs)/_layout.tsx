import { Tabs } from 'expo-router';
import { useThemeColor } from 'heroui-native';
import { Bookmark, Film, Home, Search, SquarePen } from 'lucide-react-native';

export default function TabLayout() {
  const iconColor = useThemeColor('foreground');

  return (
    <Tabs
      screenOptions={{
        headerTitleStyle: {
          fontFamily: 'NunitoBold',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Movies',
          tabBarIcon: ({ color }) => (
            <Home size={24} color={color ?? iconColor} />
          ),
        }}
      />
      <Tabs.Screen
        name="tv"
        options={{
          title: 'TV Shows',
          tabBarIcon: ({ color }) => (
            <Film size={24} color={color ?? iconColor} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => (
            <Search size={24} color={color ?? iconColor} />
          ),
        }}
      />
      <Tabs.Screen
        name="watchlist"
        options={{
          title: 'Watchlist',
          tabBarIcon: ({ color }) => (
            <Bookmark size={24} color={color ?? iconColor} />
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Form',
          tabBarIcon: ({ color }) => (
            <SquarePen size={24} color={color ?? iconColor} />
          ),
        }}
      />
    </Tabs>
  );
}
