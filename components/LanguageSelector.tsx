import React from 'react';
import { Menu, Appbar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    closeMenu();
  };

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<Appbar.Action icon="globe-model" onPress={openMenu} />}
    >
      <Menu.Item onPress={() => changeLanguage('en')} title="English" />
      <Menu.Item onPress={() => changeLanguage('es')} title="Español" />
    </Menu>
  );
};

export default LanguageSelector;