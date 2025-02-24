import React, {ReactNode} from 'react';
import {SafeAreaView, ScrollView, View, StyleSheet} from 'react-native';
import MainFooterComponent from './MainFooterComponent';

interface PageProps {
  children: ReactNode; // Define el tipo para los hijos del componente
}

const Page: React.FC<PageProps> = ({children}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View
          style={{
            display: 'flex',
            minHeight: '100%',
            backgroundColor: 'white',
            paddingTop: 40,
            paddingHorizontal: 40,
          }}>
          {children}
        </View>
        <MainFooterComponent />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 10,
  },
});
export default Page;
