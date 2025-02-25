import { Colors } from "@/styles";
import { areArraysEqual } from "@/utils/arrays";
import React, { useMemo, useState } from "react";
import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import { Icon, IconButton } from "react-native-paper";
import CheckboxInput from "./ui/CheckboxInput";

export interface DropdownCheckItem {
  title: string;
  key: string;
  value: boolean;
}

interface MultilevelCheckDropdownProps {
  title: string;
  items: DropdownCheckItem[];
  onItemClick: (value: boolean, index: number) => void;
}

const MultilevelCheckDropdown: React.FC<MultilevelCheckDropdownProps> = ({
  title,
  items,
  onItemClick,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <View>
      {/* Title with chevron/plus-minus */}
      <Pressable
        onPress={() => {
          setIsOpen(!isOpen); // Toggle open/close
        }}
        style={styles.itemContainer}
      >
        <Text style={styles.itemText}>{title}</Text>
        <View style={styles.endIcons}>
          <Icon
            source={isOpen ? "chevron-up" : "chevron-down"}
            size={15}
            color={Colors.black.second}
          />
        </View>
      </Pressable>
      {/* Render sub-items if open */}
      {isOpen &&
        items.map((i, index) => (
          <CheckboxInput
            label={i.title}
            isChecked={i.value}
            onChange={(val) => onItemClick(val, index)}
          ></CheckboxInput>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingVertical: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    fontSize: 16,
    color: Colors.black.second,
  },
  endIcons: {
    marginLeft: 5,
  },
});

export default MultilevelCheckDropdown;
