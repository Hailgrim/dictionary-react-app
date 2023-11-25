import { Action, Store, Word } from '../libs/types';
import {
  WORDS_REQUEST,
  WORDS_REQUEST_SIMILAR,
  WORDS_REQUEST_SUCCESS,
  WORDS_REQUEST_FAILURE,
  FAVORITE_WORDS_ADD,
  FAVORITE_WORDS_REMOVE,
  FAVORITE_WORDS_PHRASE_FILTER,
  FAVORITE_WORDS_PART_OF_SPEECH_FILTER_ADD,
  FAVORITE_WORDS_PART_OF_SPEECH_FILTER_REMOVE,
  FAVORITE_WORDS_MOVE_TO,
} from './actionTypes';

const initialState: Store = {
  searchPhrase: '',
  requestedWords: [],
  requestError: '',
  similarWords: [],
  wordsLoading: false,
  favoritePhrase: '',
  favoriteWords: [],
  disabledPartsOfSpeech: [],
};

try {
  const favoritePhrase = window.localStorage.getItem('favoritePhrase');
  if (favoritePhrase) initialState.favoritePhrase = JSON.parse(favoritePhrase);
} catch (error) {
  console.log(error);
}

try {
  const favoriteWords = window.localStorage.getItem('favoriteWords');
  if (favoriteWords) initialState.favoriteWords = JSON.parse(favoriteWords);
} catch (error) {
  console.log(error);
}

try {
  const disabledPartsOfSpeech = window.localStorage.getItem('disabledPartsOfSpeech');
  if (disabledPartsOfSpeech) initialState.disabledPartsOfSpeech = JSON.parse(disabledPartsOfSpeech);
} catch (error) {
  console.log(error);
}

export const rootReducer = (state = initialState, action: Action<any>): Store => {
  switch (action.type) {

    case WORDS_REQUEST:
      return { ...state, searchPhrase: action.payload.trim(), requestedWords: [], similarWords: [], wordsLoading: true, requestError: '' };
    case WORDS_REQUEST_SUCCESS:
      return { ...state, requestedWords: (action.payload as Word[]).sort((wordA, wordB) => wordA.meta.id > wordB.meta.id ? 1 : -1), wordsLoading: false };
    case WORDS_REQUEST_SIMILAR:
      return { ...state, requestedWords: [], similarWords: action.payload.sort(), wordsLoading: false };
    case WORDS_REQUEST_FAILURE:
      return { ...state, requestedWords: initialState.requestedWords, wordsLoading: false, requestError: action.payload };

    case FAVORITE_WORDS_ADD:
      return {
        ...state,
        favoriteWords: (() => {
          const result = state.favoriteWords.filter(item => item.meta.uuid !== action.payload.meta.uuid);
          result.push(action.payload);
          return result;
        })(),
      };
    case FAVORITE_WORDS_REMOVE:
      return { ...state, favoriteWords: state.favoriteWords.filter(item => item.meta.uuid !== action.payload) };
    case FAVORITE_WORDS_PHRASE_FILTER:
      return { ...state, favoritePhrase: action.payload.trim() }
    case FAVORITE_WORDS_PART_OF_SPEECH_FILTER_ADD:
      return { ...state, disabledPartsOfSpeech: state.disabledPartsOfSpeech.concat(action.payload) }
    case FAVORITE_WORDS_PART_OF_SPEECH_FILTER_REMOVE:
      return { ...state, disabledPartsOfSpeech: state.disabledPartsOfSpeech.filter(item => item !== action.payload) }
    case FAVORITE_WORDS_MOVE_TO:
      return {
        ...state,
        favoriteWords: (() => {
          const result = state.favoriteWords.filter((_, key) => key !== action.payload.key);
          result.splice(action.payload.to, 0, state.favoriteWords[action.payload.key]);
          return result;
        })(),
      }

    default: return state;
  }
}
