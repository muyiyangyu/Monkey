/**
 * I18n service
 * @file 多语言服务
 * @module app/services/i18n
 * @author yangxiang
 *
 */

import * as RNLocalize from "react-native-localize";
import { LANGUAGE_KEYS, LANGUAGES } from "constants/language";
import en from "components/languages/en";
import zh from "components/languages/zh";

export type TLanguage = LANGUAGES;

// 语言包
export type TLanguages = Record<LANGUAGES, Record<LANGUAGE_KEYS, string>>;

// UI 层用的语言列表
type TLanguageList = {
  [key in LANGUAGES]: {
    name: string;
    english: string;
  };
};

export const languageMaps: TLanguageList = {
  [LANGUAGES.ZH]: {
    name: zh[LANGUAGE_KEYS.CHINESE],
    english: en[LANGUAGE_KEYS.CHINESE]
  },
  [LANGUAGES.EN]: {
    name: en[LANGUAGE_KEYS.ENGLISH],
    english: en[LANGUAGE_KEYS.ENGLISH]
  }
};

export const getDeviceLanguage = (): TLanguage => {
  const localTags = RNLocalize.getLocales().map((local) => local.languageCode);
  return localTags.some((tag) => tag.toLocaleLowerCase().includes(LANGUAGES.ZH))
    ? LANGUAGES.ZH
    : LANGUAGES.EN;
};

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface I18nState {
  language: TLanguage;
  languages: TLanguages;
}

interface I18nPayloadState {
  key: LANGUAGE_KEYS;
}

// Define the initial state using that type
const initialState: I18nState = {
  language: LANGUAGES.ZH,
  languages: { en, zh }
};

export const I18nSlice = createSlice({
  name: "i18n",
  initialState,
  reducers: {
    updateLanguage: (state) => {
      state.language =
        state.language == LANGUAGES.ZH ? LANGUAGES.EN : LANGUAGES.ZH;
    },
    t: (state, payload) => {
      // @ts-ignore
      return state.languages[state.language][payload];
    }
  }
});

export const { updateLanguage, t } = I18nSlice.actions;

export default I18nSlice.reducer;
