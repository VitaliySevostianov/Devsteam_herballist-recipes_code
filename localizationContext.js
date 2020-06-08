import React, { createContext, useState } from 'react';
import translations, { DEFAULT_LANGUAGE } from '../content/translations';
import AsyncStorage from '@react-native-community/async-storage';
import * as RNLocalize from 'react-native-localize';

import { changeCurrentLang } from './Redux/actions'
import {store} from './Redux/reducers'
// console.log()
const APP_LANGUAGE = 'app';

export const LocalizationContext = createContext({
  translations,
  setAppLanguage: () => {},
  appLanguage: APP_LANGUAGE,
  initializeAppLanguage: () => {},
});

export const LocalizationProvider = ({ children }) => {
  const [appLanguage, setAppLanguage] = useState(APP_LANGUAGE);

  const setLanguage = language => {
    translations.setLanguage(language);
    setAppLanguage(language);
    AsyncStorage.setItem(APP_LANGUAGE, language);
  };

  const initializeAppLanguage = async () => {
    const currentLanguage = await AsyncStorage.getItem(APP_LANGUAGE);
    console.log('currentLanguage: ', currentLanguage);
      
    if (!currentLanguage) {
      let localeCode = DEFAULT_LANGUAGE;
      const supportedLocaleCodes = translations.getAvailableLanguages();
      const phoneLocaleCodes = RNLocalize.getLocales().map(
        locale => locale.languageCode,
      );
      phoneLocaleCodes.some(code => {
        if (supportedLocaleCodes.includes(code)) {
          localeCode = code;
          return true;
        }
      });
      // if(localeCode == 'ru'){
      //   store.dispatch(changeCurrentLang('ru'))
      // }else{
      //   store.dispatch(changeCurrentLang('en'))
      // }
      setLanguage(localeCode);
    } else {
      // if(currentLanguage == 'ru'){
      //   store.dispatch(changeCurrentLang('ru'))
      // }else{
      //   store.dispatch(changeCurrentLang('en'))
      // }
      setLanguage(currentLanguage);
    }
  };

  return (
    <LocalizationContext.Provider
      value={{
        translations,
        setAppLanguage: setLanguage,
        appLanguage,
        initializeAppLanguage,
      }}>
      {children}
    </LocalizationContext.Provider>
  );
};