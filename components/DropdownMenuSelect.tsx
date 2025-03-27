import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Menu, Button, Icon } from 'react-native-paper';
import { Colors } from '@/styles';
import { selectSizeStyle, selectTextStyle } from '@/styles/buttons';
import IconSvg, { IconNames } from './ui/IconSvg';

interface SelectBtnProps {
  title: string;
  onPress: () => void;
  icon: IconNames;
  iconSize?: number;
  disabled?: boolean;
  textStyle?: TextStyle
}

const SelectBtn: React.FC<SelectBtnProps> = ({ title, onPress,icon, iconSize = 17 ,disabled = false, textStyle={} }) => {
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
        width: '100%',
        borderRadius: 50,
      }}
      labelStyle={{...selectTextStyle, ...textStyle}}
      contentStyle={selectSizeStyle}
      icon={({ size, color }) => (
        <IconSvg
          name={icon}
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
  buttonTitle: string| ((selectedOption: MenuItem) => string);
  menuItems: MenuItem[];
  onSelect: (value: string) => void;
  icon: IconNames;
  iconSize?: number;
  value?: string;
  textStyle?: TextStyle
}

const DropdownMenuSelect: React.FC<DropdownMenuSelectProps> = ({
  buttonTitle,
  menuItems,
  onSelect,
  icon = "Arrow",
  iconSize,
  value,
  textStyle,
}) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleSelect = (newValue: string) => {
    setTitle(getButtonTitle(newValue));
    onSelect(newValue);
    closeMenu();
  };

  const getButtonTitle = (newValue?: string): string => {
    const sel =
      menuItems.find((item) => item.value === newValue) || menuItems[0];

    if (typeof buttonTitle === "function") {
      return buttonTitle(sel);
    }
    return `${buttonTitle}: ${sel.label}`;
  };

  const [title, setTitle] = useState<string>(getButtonTitle(value));

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
            textStyle={textStyle}
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
