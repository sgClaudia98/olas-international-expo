import { Colors } from "@/styles";
import { areArraysEqual } from "@/utils/arrays";
import React, { useMemo, useState } from "react";
import {
  View,
  Pressable,
  StyleSheet
} from "react-native";
import { Icon, IconButton } from "react-native-paper";
import { ThemedText } from "./ThemedText";

export interface DropdownItem {
  title: string;
  value: string;
  items?: DropdownItem[];
}

interface MultilevelDropdownItemProps {
  item: DropdownItem;
  level: number;
  parentTrace: DropdownItem[];
  activeTrace?: DropdownItem[];
  onItemClick: (trace: DropdownItem[]) => void;
}

const MultilevelDropdownItem: React.FC<MultilevelDropdownItemProps> = ({
  item,
  level,
  parentTrace,
  activeTrace,
  onItemClick,
}) => {
  const [isOpen, setIsOpen] = useState(level == 0 ? true : false);
  const hasSubItems = !!item.items?.length;
  const trace = [...parentTrace, item];
  const isTraceActive = useMemo(
    () => activeTrace && areArraysEqual(trace, activeTrace),
    [activeTrace, parentTrace, item]
  );

  return (
    <View key={`mlvldd-${item.value}`} style={{ marginLeft: level * 10 }}>
      {/* Title with chevron/plus-minus */}
      <View style={styles.itemContainer}>
        {/* Collapse/Expand previous button */}
        <Pressable
          onPress={() => {
            setIsOpen(!isOpen); // Toggle open/close
          }}
          style={styles.beginIcons}
        >
          <Icon
            source={!hasSubItems ? "circle-small" : isOpen ? "minus" : "plus"}
            size={15}
            color={isTraceActive ? Colors.blue.primary : Colors.black.second}
          />
        </Pressable>
        {/* ThemedText clickable area */}
        <Pressable
          style={{ flex: 1 }} // Makes the ThemedText clickable area occupy available space
          onPress={() => {
            onItemClick(trace); // Trigger the trace click
          }}
        >
          <ThemedText
            style={
              isTraceActive
                ? styles.itemThemedTextActive
                : styles.itemThemedText
            }
          >
            {item.title}
          </ThemedText>
        </Pressable>
      </View>

      {/* Render sub-items if open */}
      {hasSubItems &&
        isOpen &&
        item.items!.map((i) => (
          <MultilevelDropdownItem
            key={`item-${level}-${i.value}`}
            item={i}
            level={level + 1}
            parentTrace={trace}
            activeTrace={activeTrace}
            onItemClick={onItemClick}
          />
        ))}
    </View>
  );
};

interface MultilevelDropdownProps {
  title: string;
  items: DropdownItem[];
  onItemClick: (trace: DropdownItem[]) => void;
  activeTrace?: DropdownItem[];
}

const MultilevelDropdown: React.FC<MultilevelDropdownProps> = ({
  title,
  items,
  onItemClick,
  activeTrace,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const _onItemClick = (trace: DropdownItem[]) => {
    onItemClick(trace);
  };

  return (
    <View>
      {/* Title with chevron/plus-minus */}
      <Pressable
        onPress={() => {
          setIsOpen(!isOpen); // Toggle open/close
        }}
        style={styles.itemContainer}
      >
        <ThemedText style={styles.itemThemedText}>{title}</ThemedText>
        <View style={styles.endIcons}>
          <Icon
            source={isOpen ? "chevron-up" : "chevron-down"}
            size={15}
            color={Colors.black.second}
          />
        </View>
      </Pressable>
      {isOpen &&
        items.map((i) => (
          <MultilevelDropdownItem
            key={`item-00-${i.value}`}
            item={i}
            level={0}
            parentTrace={[]}
            activeTrace={activeTrace}
            onItemClick={_onItemClick}
          />
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
  itemThemedText: {
    fontSize: 16,
    color: Colors.black.second,
  },
  itemThemedTextActive: {
    fontSize: 16,
    color: Colors.blue.primary,
  },
  colorActive: {
    color: Colors.blue.primary,
  },
  beginIcons: {
    marginRight: 5,
  },
  endIcons: {
    marginLeft: 5,
  },
});

export default MultilevelDropdown;
