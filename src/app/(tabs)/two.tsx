import { View } from 'react-native';
import { TextField, Input, Label } from 'heroui-native';

export default function TabTwoScreen() {
  return (
    <View className="flex-1 items-center">
      <View className="px-4 w-full h-full">
        <View className="gap-4">
          <TextField>
            <Label>Name</Label>
            <Input placeholder="Hello" />
          </TextField>
          <TextField>
            <Label>Password</Label>
            <Input placeholder="Hello" secureTextEntry />
          </TextField>
        </View>
      </View>
    </View>
  );
}
