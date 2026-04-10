import {
  Button,
  Card,
  Description,
  FieldError,
  Input,
  Label,
  TextField,
} from 'heroui-native';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

export default function TabTwoScreen() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isNameInvalid = submitted && name.trim().length < 2;
  const isPasswordInvalid = submitted && password.length < 6;

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        className="flex-1"
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="p-4 pb-8"
      >
        <Card>
          <Card.Body className="gap-4">
            <View className="gap-1">
              <Card.Title>Example Form</Card.Title>
              <Card.Description>
                Built with HeroUI Native TextField primitives.
              </Card.Description>
            </View>
            <TextField isRequired isInvalid={isNameInvalid}>
              <Label>Name</Label>
              <Input
                placeholder="e.g. Nathan"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                returnKeyType="next"
              />
              <Description>Use your full name for your profile.</Description>
              <FieldError>Name must be at least 2 characters.</FieldError>
            </TextField>
            <TextField isRequired isInvalid={isPasswordInvalid}>
              <Label>Password</Label>
              <Input
                placeholder="At least 6 characters"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
              />
              <Description>Must contain at least 6 characters.</Description>
              <FieldError>Password must be at least 6 characters.</FieldError>
            </TextField>
            <Button onPress={handleSubmit}>
              <Button.Label>Validate Form</Button.Label>
            </Button>
          </Card.Body>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
