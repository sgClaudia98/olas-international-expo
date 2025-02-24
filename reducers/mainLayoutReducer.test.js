import React, { act, useReducer } from 'react'; 
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { Pressable, Text, View } from 'react-native';
import { mainLayoutReducer, mainLayoutInitialState, MainLayoutStateService} from './mainLayoutReducer';

// npx jest --coverage "./src/reducers/mainLayoutReducer.test.js"

describe('Main Layout Reducer test suite', () => {
  const FakeComponent = () => {
    const [mainLayoutStates, dispathMainLayoutStates] = useReducer(
      mainLayoutReducer, mainLayoutInitialState
    );

    MainLayoutStateService.dispatch = dispathMainLayoutStates;

    const onPressButton = () => {
      MainLayoutStateService.setMainMenuIndex(1);
    };

    const onPressButton2 = () => {
      MainLayoutStateService.dispatch({ type: '', newValue: '' });
    };

    return (
      <View>
        <Text>{mainLayoutStates.mainMenuTabIndex}</Text>
        <Pressable onPress={onPressButton} role="button" testID="pressButtonForTest">
          <Text>Press to set tab index</Text>
        </Pressable>

        <Pressable onPress={onPressButton2} role="button" testID="pressButtonForTest2">
          <Text>Press to set tab index</Text>
        </Pressable>
      </View>
    );
  };

  it('click to set main tab index',async () => {
    const { getByTestId } = await waitFor(() =>render(<FakeComponent />));

    await act(async () => {
      const pressable = await waitFor(() =>getByTestId('pressButtonForTest'));
      expect(pressable).not.toBe(null);
      fireEvent.press(pressable);

      const pressable2 = await waitFor(() =>getByTestId('pressButtonForTest2'));
      expect(pressable2).not.toBe(null);
      fireEvent.press(pressable2);
  });
  });
});