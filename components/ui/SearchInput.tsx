import React, { useState, useEffect, useRef } from 'react';
import { Searchbar } from 'react-native-paper';
import { inputHeight, inputStyle } from '@/styles/input';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

interface SearchInputProps {
  initialValue?: string;
  onChangeText?: (text: string) => void;
  loading?: boolean;
  debounceDelay?: number; // Optional debounce delay, default 500ms
}

const SearchInput: React.FC<SearchInputProps> = ({
  initialValue,
  onChangeText,
  loading = false,
  debounceDelay = 500, // Default debounce delay is 500ms
}) => {
  const [searchQuery, setSearchQuery] = useState(initialValue || ""); // Immediate state for the input
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
    setSearchQuery(text); // Update the search query immediately on user input
    searchSubject.current.next(text); // Emit the new value to the RxJS Subject
  };

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={handleChangeText}
      value={searchQuery} // Display the immediate value in the Searchbar
      style={inputHeight}
      inputStyle={inputStyle}
      loading={loading}
    />
  );
};

export default SearchInput;