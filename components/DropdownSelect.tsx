import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Menu, Button, Icon } from 'react-native-paper';
import { Colors } from '@/styles';
import { selectRightSizeStyle, selectSizeStyle, selectTextStyle } from '@/styles/buttons';

interface SelectBtnProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

const SelectBtn: React.FC<SelectBtnProps> = ({ title, onPress, disabled = false }) => {
  const colors = {
    primary: Colors.blue.second,
    outline: Colors.blue.second,
    onSurfaceDisabled: Colors.black.third,
  };
  return (
    <Button
      theme={{ colors }}
      onPress={onPress}
      mode="outlined"
      disabled={disabled}
      style={{
        width: 'auto',
        borderRadius: 50,
      }}
      labelStyle={selectTextStyle}
      contentStyle={selectRightSizeStyle}
      icon={({ size, color }) => (
        <Icon
          source="chevron-down"
          size={20}
          color={color}
        />
      )}
    >
      {title}
    </Button>
  );
};

interface DropdownSelectProps {
  buttonTitle: string| ((selectedOption: string) => string);
  menuItems: { label: string; value: string }[];
  onSelect: (value: string) => void;
  value?: string;
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({
  buttonTitle,
  menuItems,
  onSelect,
  value,
}) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleSelect = (value: string) => {
    onSelect(value);
    closeMenu();
  };
  const getButtonTitle = (): string => {
    if (typeof buttonTitle === 'function') {
      return buttonTitle(selectedLabel);
    }
    return `${buttonTitle}: ${selectedLabel}`;
  };
  
  const selectedLabel =
    menuItems.find((item) => item.value === value)?.label || menuItems[0]?.label;

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        mode="elevated"
        anchor={
          <SelectBtn
            onPress={openMenu}
            title={getButtonTitle()}
          />
        }
        anchorPosition="bottom"
        contentStyle={styles.menu}
      >
        {menuItems.map((item) => (
          <Menu.Item
          key={`mlvldds-${item.value}`}
            onPress={() => handleSelect(item.value)}
            title={item.label}
          />
        ))}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 'auto',
  },
  menu: {
    borderRadius: 15,
  },
});

export default DropdownSelect;
