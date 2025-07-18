import { colors } from '@/constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import DropDownPicker, { ValueType } from 'react-native-dropdown-picker';

interface DropdownOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  selected?: boolean;
  parent?: string | number;
}

interface FormDropdownProps {
  triggerLabel: string;
  options: DropdownOption[];
  value: string | number | (string | number)[] | null;
  onValueChange: (value: string | number | (string | number)[] | null) => void;
  multiple?: boolean;
  min?: number;
  max?: number;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  dropdownStyle?: StyleProp<ViewStyle>;
  zIndex?: number;
  zIndexInverse?: number;
}

export const FormDropdown: React.FC<FormDropdownProps> = ({
  triggerLabel,
  options,
  value,
  onValueChange,
  multiple = false,
  min = 0,
  max = 10,
  disabled = false,
  containerStyle,
  dropdownStyle,
  zIndex = 1000,
  zIndexInverse = 3000
}) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(options);

  if (multiple === true) {
    // For multiple selection, ensure value is an array
    const multiValue = Array.isArray(value) ? value : (value ? [value] : []);

    return (
      <DropDownPicker
        open={open}
        value={multiValue}
        items={items}
        setOpen={setOpen}
        setValue={(val) => {
          if (typeof val === 'function') {
            const newVal = val(multiValue);
            onValueChange(newVal);
          } else {
            onValueChange(val);
          }
        }}
        setItems={setItems}
        placeholder={triggerLabel}
        placeholderStyle={{ textAlign: 'right', color: colors.primaryDarker, fontSize: 20 }}
        multiple={true}
        min={min}
        max={max}
        disabled={disabled}
        arrowIconStyle={{
          marginLeft: 0,
          marginRight: 'auto'
        }}
        ArrowDownIconComponent={({style}) => (
          <MaterialIcons name="keyboard-arrow-down" size={24} color={colors.primaryDarker} />
        )}
        ArrowUpIconComponent={({style}) => (
          <MaterialIcons name="keyboard-arrow-up" size={24} color={colors.primaryDarker} />
        )}
        style={{ borderColor: colors.primaryDarker,flexDirection: 'row-reverse', ...(dropdownStyle as object) }}
        containerStyle={[{ marginBottom: 15 }, containerStyle]}
        zIndex={zIndex}
        zIndexInverse={zIndexInverse}
      />
    );
  } else {
    // For single selection, ensure value is a single value (string or number)
    const singleValue = Array.isArray(value) ? (value.length > 0 ? value[0] : null) : value;

    return (
      <DropDownPicker
        open={open}
        value={singleValue as ValueType}
        items={items}
        setOpen={setOpen}
        setValue={(val) => {
          if (typeof val === 'function') {
            const newVal = val(singleValue as ValueType);
            onValueChange(newVal);
          } else {
            onValueChange(val);
          }
        }}
        setItems={setItems}
        placeholder={triggerLabel}
        placeholderStyle={{ textAlign: 'right', color: colors.primaryDarker, fontSize: 20 }}
        arrowIconStyle={{
          marginLeft: 0,
          marginRight: 'auto',
        }}
        ArrowDownIconComponent={({style}) => (
          <MaterialIcons name="keyboard-arrow-down" size={30} color={colors.primaryDarker} />
        )}
        ArrowUpIconComponent={({style}) => (
          <MaterialIcons name="keyboard-arrow-up" size={30} color={colors.primaryDarker} />
        )}
        multiple={false}
        disabled={disabled}
        style={{ borderColor: colors.primaryDarker, flexDirection: 'row-reverse', ...(dropdownStyle as object) }}
        containerStyle={[{ marginBottom: 15 }, containerStyle]}
        zIndex={zIndex}
        zIndexInverse={zIndexInverse}
      />
    );
  }
};

