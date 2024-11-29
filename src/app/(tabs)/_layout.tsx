import { FormInput, Home } from '@tamagui/lucide-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
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
          tabBarIcon: ({ color }) => <Home color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Form',
          tabBarIcon: ({ color }) => <FormInput color={color} />,
        }}
      />
    </Tabs>
  );
}
