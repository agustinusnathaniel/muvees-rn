import { Home, SquarePen } from 'lucide-react-native';
import { Tabs } from 'expo-router';
import { useThemeColor } from 'heroui-native';

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
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Home size={24} color={color ?? iconColor} />
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
