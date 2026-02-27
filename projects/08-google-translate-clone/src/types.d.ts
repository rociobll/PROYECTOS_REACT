import type { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from "./constant"

// keyof obtiene las claves de SUPPORTED_LANGUAGES,
// por lo que Language solo puede ser una de esas keys
//keyof recupera las key de SuportedLanguages y a language de dice que sus tipos pueden ser esasas
export type Language = keyof typeof SUPPORTED_LANGUAGES  // asi recuperamos de ese tipo de objoeto las keys- en lugar de ponerlas a mano
export type AutoLanguage = typeof AUTO_LANGUAGE
export type FromLanguage = Language | AutoLanguage

export interface State {
  fromLanguage: string
  toLanguage: strin
  fromText: string,
  result: string
  loading: boolean
}

export type Action =
  |  { type: 'SET_FROM_LANGUAGE', payload: string }
  |  { type: 'INTERCHANGE_LANGUAGES' }
  |  { type: 'SET_TO_LANGUAGE', payload: string }
  |  { type: 'SET_FROM_TEXT', payload: string }
  |  { type: 'SET_RESULT', payload: string }
  |  { type: 'SET_LOADING', payload: boolean }

  

