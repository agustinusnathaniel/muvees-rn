import { Check } from 'lucide-react-native';
import { useMemo, useState, useCallback } from 'react';
import { TextInput, ScrollView, Keyboard, View } from 'react-native';
import { Select } from 'heroui-native';
import { useThemeColor } from 'heroui-native';

type SelectOptionValue = {
  value: string;
  label: string;
};

type SelectInputProps<Option> = {
  options: Array<Option>;
  getOptionLabel: (option: Option) => string;
  getOptionValue: (option: Option) => string;
  onSelect?: (selectedEntry: Option) => void;
  placeholder?: string;
  searchable?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
};

export const SelectInput = <Option,>({
  options,
  getOptionLabel,
  getOptionValue,
  onSelect,
  placeholder,
  searchable,
  value,
  onValueChange,
}: SelectInputProps<Option>) => {
  const [keyword, setKeyword] = useState('');
  const fieldColor = useThemeColor('field-foreground');
  const placeholderColor = useThemeColor('field-placeholder');
  const borderColor = useThemeColor('field-border');
  const fieldBgColor = useThemeColor('field');

  const selectedItem = options.find((item) => getOptionValue(item) === value);
  const valueLabel = selectedItem ? getOptionLabel(selectedItem) : '';

  const filteredOptions = useMemo(
    () =>
      options.filter((item) =>
        getOptionLabel(item).toLowerCase().includes(keyword.toLowerCase()),
      ),
    [options, keyword, getOptionLabel],
  );

  const handleValueChange = useCallback(
    (newValue: SelectOptionValue | undefined) => {
      if (newValue?.value) {
        const selectedOption = options.find(
          (item) => getOptionValue(item) === newValue.value,
        );
        if (selectedOption) {
          onSelect?.(selectedOption);
        }
        onValueChange?.(newValue.value);
      }
      setKeyword('');
    },
    [options, getOptionValue, onSelect, onValueChange],
  );

  const handleOpenChange = useCallback((open: boolean) => {
    if (!open) {
      setKeyword('');
      Keyboard.dismiss();
    }
  }, []);

  // Build the current value object for HeroUI Select
  // HeroUI Select expects value as { value: string; label: string } | undefined
  const currentValue: SelectOptionValue | undefined = value
    ? { value, label: valueLabel }
    : undefined;

  return (
    <Select
      value={currentValue}
      onValueChange={handleValueChange}
      onOpenChange={handleOpenChange}
      presentation="bottom-sheet"
    >
      <Select.Trigger>
        <Select.Value placeholder={placeholder ?? 'Select...'} className="font-semibold" />
        <Select.TriggerIndicator />
      </Select.Trigger>
      <Select.Portal>
        <Select.Overlay />
        <Select.Content presentation="bottom-sheet" snapPoints={['45%']}>
          {searchable ? (
            <View className="px-4 pt-3 pb-1">
              <TextInput
                value={keyword}
                onChangeText={setKeyword}
                placeholder="Search..."
                placeholderTextColor={placeholderColor}
                className="h-10 px-3 rounded-xl border"
                style={{
                  color: fieldColor,
                  backgroundColor: fieldBgColor,
                  borderColor: borderColor,
                }}
              />
            </View>
          ) : null}
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 24 }}
          >
            {filteredOptions.map((item) => {
              const itemValue = getOptionValue(item);
              const itemLabel = getOptionLabel(item);
              const isSelected = itemValue === value;

              return (
                <Select.Item
                  key={itemValue}
                  value={itemValue}
                  label={itemLabel}
                  className="py-3 px-3"
                >
                  <Select.ItemLabel
                    className={isSelected ? 'font-bold' : undefined}
                  />
                  {isSelected && (
                    <Select.ItemIndicator>
                      <Check size={18} color={fieldColor} />
                    </Select.ItemIndicator>
                  )}
                </Select.Item>
              );
            })}
          </ScrollView>
        </Select.Content>
      </Select.Portal>
    </Select>
  );
};
