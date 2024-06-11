import { Check, ChevronDown } from '@tamagui/lucide-icons';
import { type ReactNode, useMemo, useState } from 'react';
import { Adapt, Input, Select, type SelectProps, Sheet, View } from 'tamagui';

type SelectInputProps<Option> = {
  options: Array<Option>;
  getOptionLabel: (option: Option) => string;
  getOptionValue: (option: Option) => string;
  onSelect?: (selectedEntry: Option) => void;
  placeholder?: ReactNode;
  searchable?: boolean;
} & SelectProps;

export const SelectInput = <Option,>({
  options,
  getOptionLabel,
  getOptionValue,
  onSelect,
  placeholder,
  searchable,
  ...props
}: SelectInputProps<Option>) => {
  const [keyword, setKeyword] = useState('');

  const selectedItem = options.find(
    (item) => getOptionValue(item) === props.value,
  );
  const valueLabel = selectedItem ? getOptionLabel(selectedItem) : null;

  const filteredOptions = useMemo(
    () =>
      options.filter((item) =>
        getOptionLabel(item).toLowerCase().includes(keyword.toLowerCase()),
      ),
    [getOptionLabel, options, keyword],
  );
  const selectOptionItems = useMemo(
    () =>
      filteredOptions.map((item, idx) => {
        const value = getOptionValue(item);
        const label = getOptionLabel(item);
        return (
          <Select.Item
            index={idx}
            value={value}
            key={value}
            onPress={() => {
              onSelect?.(item);
            }}
          >
            <Select.ItemText>{label}</Select.ItemText>
            <Select.ItemIndicator marginLeft="auto">
              <Check size={16} />
            </Select.ItemIndicator>
          </Select.Item>
        );
      }),
    [getOptionLabel, getOptionValue, onSelect, filteredOptions],
  );

  const resetKeyword = () => setKeyword('');

  return (
    <Select
      defaultValue=""
      disablePreventBodyScroll
      onOpenChange={resetKeyword}
      {...props}
    >
      <Select.Trigger iconAfter={ChevronDown}>
        <Select.Value fontWeight="700" placeholder={placeholder}>
          {valueLabel}
        </Select.Value>
      </Select.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet
          modal
          dismissOnSnapToBottom
          moveOnKeyboardChange
          forceRemoveScrollEnabled
          unmountChildrenWhenHidden
          snapPointsMode="fit"
        >
          <Sheet.Handle />
          <Sheet.Frame>
            {searchable ? (
              <Input
                margin="$4"
                placeholder="Search..."
                onChangeText={setKeyword}
                value={keyword}
              />
            ) : null}
            <Sheet.ScrollView scrollEnabled={filteredOptions.length > 6}>
              <Adapt.Contents />
              <View height="$4" />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay animation="lazy" />
        </Sheet>
      </Adapt>

      <Select.Content>
        <Select.ScrollUpButton />
        <Select.Viewport>
          <Select.Group>{selectOptionItems}</Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton />
      </Select.Content>
    </Select>
  );
};
