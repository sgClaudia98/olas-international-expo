import React, { useEffect } from "react";
import { Menu, Appbar, IconButton, Button } from "react-native-paper";
import { useTranslation } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropdownSelect2, {MenuItem} from './DropdownMenuSelect';

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const changeLanguage = (lng: string) => {
    AsyncStorage.setItem("language", lng);
    i18n.changeLanguage(lng);
    closeMenu();
  };
  
  const getSavedLanguage = async () => {
    let savedLanguage = await AsyncStorage.getItem("language");
    if (!savedLanguage) {
      savedLanguage = Localization.getLocales()[0].languageCode;
    }
    return savedLanguage;
  };

  useEffect(() => {
    getSavedLanguage().then((language) => i18n.changeLanguage(language));
  }, []);

  return (
    <DropdownSelect2
        icon="globe-model"
        buttonTitle={value => value?.value}
        onSelect={changeLanguage}
        menuItems={[
          { label: t("LANGUAGE.EN"), value: "en" },
          { label: t("LANGUAGE.ES"), value: "es" },
        ]}
        iconSize={24}
        value={i18n.language}
    />
  );
};

export default LanguageSelector;
