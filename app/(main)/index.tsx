import Btn from "@/components/Btn";
import Page from "@/components/layout/Page";
import { ThemedText } from "@/components/ThemedText";
import { Href, useRouter } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { View, Platform } from "react-native";

export default function NewScreen() {
  const router = useRouter();
  const [isModalVisible, setModalVisible] = useState(true); // Modal is visible by default

  const countries = [
    {id: 'CU', name: 'Cuba'},
    {id: 'VZ', name: 'Venezuela'},
    {id: 'MX', name: 'Mexico'},
    {id: 'BR', name: 'Brazil'},
  ];
  const [selectedCountry, setSelectedCountry] = useState<string>(countries[0].name); // No country selected initially

  const selectCountry = (country: string) => {
    setSelectedCountry(country);
    setModalVisible(false); // Close the modal after selection
  };
  const { t } = useTranslation();

  return (
    <Page>
    <View style={{gap: 2}}>

      <ThemedText>{t('LANGUAGE')}</ThemedText>

      {Platform.OS != 'web' && (
        <Btn
          title="go to promo"
          onPress={() => router.navigate('/promos')}
        />
      )}
      <Btn
        title="go to auth"
        onPress={() => router.navigate('/(auth)/login')}
      />

      <Btn
        title="View Profile"
        onPress={() => router.navigate('/(main)/profile')}
      />

      <Btn
        title="Marketplace"
        onPress={() =>router.navigate('/(main)/services/market')
        }
      />
      <Btn
        title="Travel"
        onPress={() =>router.navigate('/(main)/services/travel')}
      />

      {/* Main Screen Content */}
      <ThemedText>
        {selectedCountry ? `You selected: ${selectedCountry}` : 'No country selected yet'}
      </ThemedText>

      {/* <CountrySelectorModal selectedCountry={selectedCountry} countries={countries} onSelectCountry={selectCountry} visible={isModalVisible} /> */}
    </View>
  </Page>
  );
}
