import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Menu, Button, Icon } from 'react-native-paper';
import { Colors } from '@/styles';
import { selectSizeStyle, selectTextStyle } from '@/styles/buttons';

interface SelectBtnProps {
  title: string;
  onPress: () => void;
  icon: string;
  iconSize?: number;
  disabled?: boolean;
}

const SelectBtn: React.FC<SelectBtnProps> = ({ title, onPress,icon, iconSize = 20 ,disabled = false }) => {
  const colors = {
    primary: Colors.black.primary,
    outline: Colors.black.primary,
    onSurfaceDisabled: Colors.black.third,
  };
  return (
    <Button
      theme={{ colors }}
      onPress={onPress}
      mode="text"
      disabled={disabled}
      style={{
        width: 'auto',
        borderRadius: 50,
      }}
      labelStyle={selectTextStyle}
      contentStyle={selectSizeStyle}
      icon={({ size, color }) => (
        <Icon
          source={icon}
          size={iconSize}
          color={color}
        />
      )}
    >
      {title}
    </Button>
  );
};
export type MenuItem = { label: string; value: string };
interface DropdownMenuSelectProps {
  buttonTitle: string| ((selectedOption: string) => string);
  menuItems: MenuItem[];
  onSelect: (value: string) => void;
  icon?: string;
  iconSize?: number;
  value?: string;
}

const DropdownMenuSelect: React.FC<DropdownMenuSelectProps> = ({
  buttonTitle,
  menuItems,
  onSelect,
  icon = "menu",
  iconSize,
  value,
}) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleSelect = (newValue: string) => {
    setTitle(getButtonTitle(newValue))
    onSelect(newValue);
    closeMenu();
  };

  const getButtonTitle = (newValue?: string): string => {
    const selectedLabel = menuItems.find((item) => item.value === newValue)?.label || menuItems[0]?.label;
  
    if (typeof buttonTitle === 'function') {
      return buttonTitle(selectedLabel);
    }
    return `${buttonTitle}: ${selectedLabel}`;
  };
  
  const [title, setTitle] = useState<string>(getButtonTitle(value))

  useEffect(() => {
    setTitle(getButtonTitle(value));
  }, [value]);
  

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        mode="elevated"
        anchor={
          <SelectBtn
            onPress={openMenu}
            title={title}
            icon={icon}
            iconSize={iconSize}
          />
        }
        anchorPosition="bottom"
        contentStyle={styles.menu}
      >
        {menuItems.map((item) => (
          <Menu.Item
          key={`mlvldds2-${item.value}`}
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

export default DropdownMenuSelect;
