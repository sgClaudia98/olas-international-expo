import React, { useState, useEffect, useRef } from "react";
import { ActivityIndicator, TextInput } from "react-native-paper";
import { inputHeight, inputStyle } from "@/styles/input";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import styles from "@/styles/search";
import { View } from "react-native";
import { Colors } from "@/styles";
import IconSvg from "./IconSvg";
import { use } from "i18next";

interface SearchInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  loading?: boolean;
  debounceDelay?: number; // Optional debounce delay, default 500ms
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  loading = false,
  debounceDelay = 1000, // Default debounce delay is 500ms
}) => {
  const [inputValue, setInputValue] = useState(value || ""); // Local state for input value
  const searchSubject = useRef(new Subject<string>()); // Ref for managing the RxJS Subject

  // Effect hook to manage the debounce using RxJS
  useEffect(() => {
    const subscription = searchSubject.current
      .pipe(debounceTime(debounceDelay))
      .subscribe((debouncedValue) => {
        if (onChangeText) {
          onChangeText(debouncedValue); // Trigger the callback with the debounced value
        }
      });

    // Cleanup subscription on component unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [debounceDelay, onChangeText]);

  // Handle immediate input change
  const handleChangeText = (text: string) => {
    setInputValue(text); // Update local state immediately
    searchSubject.current.next(text); // Emit the new value to the RxJS Subject
  };

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value); // Update local state when the prop changes
    }
  }, [value]);

  return (
    <TextInput
      mode="outlined"
      theme={{ colors: { background: Colors.black.fifth } }} // Example theme color
      outlineColor="transparent" // Example outline color
      activeOutlineColor="transparent" // Example active outline color
      placeholder="Nombre del producto"
      placeholderTextColor={Colors.black.second}
      textColor={Colors.black.primary}
      style={{ height: inputHeight.height }}
      onChangeText={handleChangeText}
      value={inputValue} // Display the immediate value in the Searchbar
      right={
        loading ? (
          <TextInput.Icon
            icon={() => <ActivityIndicator animating={loading} />}
          />
        ) : (
          <TextInput.Icon
            disabled={true}
            icon={() => (
              <IconSvg name="Search" size={20} color={Colors.black.primary} />
            )}
          />
        )
      }
    />
  );
};

export default SearchInput;
