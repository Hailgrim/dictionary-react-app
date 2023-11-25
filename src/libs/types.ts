export type Prs = {
  mw: string;
};

export type Word = {
  meta: {
    id: string;
    uuid: string;
    stems: string[];
  };
  hwi?: {
    prs?: Prs[];
  };
  fl: string;
  shortdef: string[];
};

export type Action<T = undefined> = {
  type: string;
  payload: T;
};

export type Store = {
  searchPhrase: string;
  requestedWords: Word[];
  requestError: string;
  similarWords: string[];
  wordsLoading: boolean;
  favoritePhrase: string;
  favoriteWords: Word[];
  disabledPartsOfSpeech: string[];
};
