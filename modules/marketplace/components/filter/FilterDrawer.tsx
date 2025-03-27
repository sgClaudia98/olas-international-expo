import React from "react";
import type { ReactNode } from "react";
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Platform,
} from "react-native";
import { Colors } from "@/styles";
import IconSvg from "@/components/ui/IconSvg";

interface FilterDrawerProps {
  visible: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({
  visible,
  onClose,
  children,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.drawer}>
          <View style={styles.header}>
            <Text style={styles.title}>Filters</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <IconSvg name="Close" />
            </TouchableOpacity>
          </View>
          <View style={styles.content}>{children}</View>
          <View style={styles.footer}>
            <TouchableOpacity style={styles.applyButton} onPress={onClose}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  drawer: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: Platform.OS === "ios" ? 0 : 20,
    ...Platform.select({
      ios: {
        shadowColor: Colors.black.default,
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.black.fifth
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.black.fifth,
  },
  applyButton: {
    backgroundColor: Colors.blue.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  applyButtonText: {
    color: Colors.white.default,
    fontWeight: "600",
    fontSize: 16,
  },
});

export default FilterDrawer;
