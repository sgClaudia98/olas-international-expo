import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class PlatformStorage {
  private isSSR = typeof window === 'undefined';

  async getItem(key: string): Promise<string | null> {
    if (Platform.OS === 'web' && this.isSSR) {
      return null;
    }
    
    try {
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        return window.localStorage.getItem(key);
      }
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error('Error getting item from storage:', error);
      return null;
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === 'web' && this.isSSR) {
      return;
    }

    try {
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        window.localStorage.setItem(key, value);
      } else {
        await AsyncStorage.setItem(key, value);
      }
    } catch (error) {
      console.error('Error setting item in storage:', error);
    }
  }

  async removeItem(key: string): Promise<void> {
    if (Platform.OS === 'web' && this.isSSR) {
      return;
    }

    try {
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      } else {
        await AsyncStorage.removeItem(key);
      }
    } catch (error) {
      console.error('Error removing item from storage:', error);
    }
  }

  async clear(): Promise<void> {
    if (Platform.OS === 'web' && this.isSSR) {
      return;
    }

    try {
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        window.localStorage.clear();
      } else {
        await AsyncStorage.clear();
      }
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
}

export default new PlatformStorage();