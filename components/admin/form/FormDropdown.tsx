import { lessonTypeOptions } from '@/constants/forms/formOptions';
import { colors } from '@/constants/styles';
import { fetchCategoriesBySection } from '@/services/category.service';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Alert, StyleProp, ViewStyle } from 'react-native';
import DropDownPicker, { ValueType } from 'react-native-dropdown-picker';

interface DropdownOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  selected?: boolean;
  parent?: string | number;
}

// Define a type for category objects
interface CategoryObject {
  id: string;
  name: string;
}

interface FormDropdownProps {
  type: "lesson" | "category";
  triggerLabel: string;
  options?: DropdownOption[];
  value: string | number | null | CategoryObject;
  onValueChange: (value: string | number | null) => void;
  multiple?: boolean;
  min?: number;
  max?: number;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  dropdownStyle?: StyleProp<ViewStyle>;
  zIndex?: number;
  zIndexInverse?: number;
  dropDownDirection: "TOP" | "BOTTOM" | "DEFAULT" | "AUTO"
  selectedSection: 'long' | 'short';
}

export const FormDropdown: React.FC<FormDropdownProps> = ({
  type,
  dropDownDirection,
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
  zIndexInverse = 3000,
  selectedSection,
}) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(options || []);

  useEffect(() => {
    fetchOptions();
  }, [type, selectedSection])

  const fetchOptions = async () => {
    try {
      if (type === 'lesson') {
        try {
          const categoryOptions = await fetchCategoriesBySection(selectedSection);
          setItems(categoryOptions);
        } catch (error) {
          Alert.alert('An error occured', 'Try again later')
        }
      } else if (type === 'category') {
        setItems(lessonTypeOptions)
      }
    } catch (error) {
      console.error(`Error fetching ${type} options:`, error);
    }
  };

  // Extract the value ID for dropdown selection
  const singleValue = typeof value === 'object' ? value?.id : value;

  // Create a custom label for the selected value when it's a category object
  const getValueLabel = (): string | undefined => {
    if (value && typeof value === 'object' && 'name' in value) {
      return value.name;
    }
    return undefined;
  }

  return (
    <DropDownPicker
      open={open}
      value={singleValue as ValueType}
      items={items || []}
      setOpen={setOpen}
      setValue={(val) => {
        if (typeof val === 'function') {
          const newVal = val(singleValue as ValueType);
          onValueChange(newVal);
        } else {
          onValueChange(val);
        }
      }}
      // Display the category name if available
      labelStyle={{
        fontWeight: 'bold',
        textAlign: 'right',
        color: colors.primaryDarker,
        fontSize: 20
      }}
      listItemLabelStyle={{
        textAlign: 'right',
        color: colors.primaryDarker,
        fontSize: 20
      }}
      // If we have a category object with a name, show it in the placeholder
      placeholder={getValueLabel() || triggerLabel}
      setItems={setItems}
      placeholderStyle={{ textAlign: 'right', color: colors.primaryDarker, fontSize: 20 }}
      textStyle={{ textAlign: 'right', color: colors.primaryDarker, fontSize: 20 }}
      arrowIconStyle={{
        marginLeft: 0,
        marginRight: 'auto',
      }}
      ArrowDownIconComponent={({ style }) => (
        <MaterialIcons name="keyboard-arrow-down" size={30} color={colors.primaryDarker} />
      )}
      ArrowUpIconComponent={({ style }) => (
        <MaterialIcons name="keyboard-arrow-up" size={30} color={colors.primaryDarker} />
      )}
      multiple={false}
      disabled={disabled}
      dropDownDirection={dropDownDirection}
      style={{
        borderColor: colors.primaryDarker,
        flexDirection: 'row-reverse',
        ...(dropdownStyle as object)
      }}
      containerStyle={[{
        marginBottom: 15
      }, containerStyle]}
      dropDownContainerStyle={{
        borderColor: colors.primaryTwo,
        borderRadius: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5
      }}
      listMode="SCROLLVIEW"
      scrollViewProps={{
        nestedScrollEnabled: true,
      }}
      zIndex={zIndex || 5000}
      zIndexInverse={zIndexInverse || 1000}
    />
  );
  // }
};

