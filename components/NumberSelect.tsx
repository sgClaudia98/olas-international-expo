import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Menu, Button, Icon } from "react-native-paper";
import { Colors } from "@/styles";
import {
  selectRightSizeStyle,
  selectSizeStyle,
  selectTextStyle,
} from "@/styles/buttons";

interface SelectBtnProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  themeColors?: {
    primary: string;
    outline: string;
    onSurfaceDisabled: string;
  };
}

const SelectBtn: React.FC<SelectBtnProps> = ({
  title,
  onPress,
  disabled = false,
  themeColors,
}) => {
  const defaultColors = {
    primary: "#F4F4F4",
    secondary: Colors.black.default,
    outline: Colors.blue.second,
    onSurfaceDisabled: Colors.black.third,
  };

  const colors = themeColors || defaultColors;

  return (
    <Button
      theme={{ colors }}
      onPress={onPress}
      mode="contained"
      disabled={disabled}
      style={{
        width: "auto",
        borderRadius: 50,
        }}
      labelStyle={StyleSheet.flatten([selectTextStyle, {color: Colors.black.default, fontSize: 14, marginLeft: 15} ])}
      contentStyle={StyleSheet.flatten([selectRightSizeStyle, {paddingVertical: 3, paddingRight: 0}])}
      icon={({ size, color }) => (
        <View style={{marginRight: -10}}>

        <Icon source="chevron-down" size={20} color={color} />
        </View>
      )}
    >
      {title}
    </Button>
  );
};

interface NumberSelectProps {
  length?: number;
  onSelect: (value: number) => void;
  value?: number;

  themeColors?: {
    primary: string;
    outline: string;
    onSurfaceDisabled: string;
  };
}

const NumberSelect: React.FC<NumberSelectProps> = ({
  length = 30,
  onSelect,
  value,
  themeColors,
}) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleSelect = (item: number) => {
    onSelect(item);
    closeMenu();
  };

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        mode="elevated"
        anchor={
          <SelectBtn
            themeColors={themeColors}
            onPress={openMenu}
            title={value.toString()}
          />
        }
        anchorPosition="bottom"
        contentStyle={styles.menu}
      >
        {Array.from({ length }, (_, i) => (
          <Menu.Item
            key={`mlvldds-${i}`}
            onPress={() => handleSelect(i + 1)}
            title={(i + 1).toString()}
          />
        ))}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: "auto",
  },
  menu: {
    borderRadius: 15,
  },
});

export default NumberSelect;
