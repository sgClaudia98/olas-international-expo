import {MainLayoutcontext} from '@/contexts/mainLayoutContext';
import {MainLayoutStateService} from '@/reducers/mainLayoutReducer';
import { Colors } from '@/styles';
import { useRouter } from 'expo-router';
import React, {useContext} from 'react';
import {Modal, View, Button, Text, StyleSheet, TouchableOpacity} from 'react-native';

export const AuthRequestModal: React.FC = () => {
  const {
    mainLayoutStates: {isLoginVisible},
  } = useContext(MainLayoutcontext);

  const route = useRouter();
  const setShowAuthDialog = (show: boolean) => {
    MainLayoutStateService.setIsModalVisible(show);
  };

  const goToLogin = () => {
    // navigate to login screen
    route.push('/(auth)/login'); 
    setShowAuthDialog(false);
  };

  return (
    <Modal
      visible={isLoginVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => setShowAuthDialog(false)}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
        <Text style={styles.title}>Do you want to make a purchase?</Text>
      <Text style={styles.description}>
        Remember that to keep your selection in the cart and make the payment, 
        you must log in to your account. If you don't, you will lose the added products.
      </Text>
      <TouchableOpacity style={styles.loginButton} onPress={goToLogin}>
        <Text style={styles.loginButtonText}>Login or Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.notNowButton} onPress={() => setShowAuthDialog(false)}>
        <Text style={styles.notNowText}>Not now.</Text>
      </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(8, 51, 102, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '50%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
  loginButton: {
    backgroundColor: Colors.blue.primary,
    padding: 10,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    marginBottom: 10,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  notNowButton: {
    padding: 10,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  notNowText: {
    color: Colors.blue.primary,
    fontSize: 16,
  },
});
