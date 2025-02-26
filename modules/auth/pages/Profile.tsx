import {StyleSheet, Text, View, ViewProps, Image} from 'react-native';
import React, {FC, useEffect} from 'react';
import {Colors} from '@/styles';
import Btn from '@/components/Btn';
import {Button} from 'react-native-paper';
import {useDispatch, UseDispatch} from 'react-redux';
import { useRouter } from 'expo-router';
import { logout } from '../slices/authSlice';
import { useGetProfileQuery } from '../services/api/AccountService';

export const Profile: FC<ViewProps> = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {data: profile, isLoading, isError} = useGetProfileQuery();

  const handleLogout = () => {
    dispatch(logout());
    router.navigate('/(auth)/login');
  };

  return (
    <>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : isError || !profile ? (
        <View>
          <Text style={{marginBottom: 10}}>You have to log in to see your profile.</Text>
          <Btn
            title="Login"
            onPress={() => router.navigate('/(auth)/login')}
            size="small"
          />
        </View>
      ) : (
        <View style={styles.profileCard}>
          <View style={styles.cardHeader}>
            <Image
              source={{uri: 'https://placehold.co/75x75'}}
              width={75}
              height={75}
              style={styles.avatar}
              resizeMode="contain"
            />
            <View style={styles.profileInfoWrapper}>
              <Text style={styles.profileInfo}>{profile.client.fullName || 'Unknown'}</Text>
              <Text style={styles.profileInfo}>{profile.client.email}</Text>
            </View>
          </View>
          <View style={styles.cardContent}>
            <Text>Mi cuenta</Text>
            <Text>Saldo</Text>
            <Text>Historial</Text>
            <Text>Métodos de pago</Text>
            <Text>Tarjetas de regalo</Text>
          </View>
          <View style={styles.cardFooter}>
            <Button onPress={handleLogout}>Cerrar sesión</Button>
          </View>
        </View>
      )}
    </>
    );
}

const styles = StyleSheet.create({
  profileCard: {
    paddingBottom: 20,
    backgroundColor: Colors.black.fifth,
    shadowColor: Colors.black.primary,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    shadowOpacity: 0.5,
    borderRadius: 12,
    width: '35%',
  },
  cardHeader: {
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 30,
    backgroundColor: Colors.blue.primary,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 30,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: Colors.white.default,
  },
  profileInfoWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 10,
  },
  profileInfo: {
    color: Colors.white.default,
    fontSize: 20,
    lineHeight: 24,
  },
  cardContent: {
    paddingVertical: 40,
    paddingHorizontal: 30,
    gap: 10,
  },
  cardFooter: {
    paddingHorizontal: 30,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.black.third,
  },
});