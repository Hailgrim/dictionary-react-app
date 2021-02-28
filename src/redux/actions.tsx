import {
	WORDS_REQUEST,
	FAVORITE_WORDS_ADD,
	FAVORITE_WORDS_REMOVE,
	FAVORITE_WORDS_PHRASE_FILTER,
	FAVORITE_WORDS_PART_OF_SPEECH_FILTER_ADD,
	FAVORITE_WORDS_PART_OF_SPEECH_FILTER_REMOVE,
	FAVORITE_WORDS_MOVE_TO
} from "./actionTypes";

export function getWords(word: string) {
	return {
		type: WORDS_REQUEST,
		payload: word
	};
}

export function addFavoriteWord(word: any) {
	return {
		type: FAVORITE_WORDS_ADD,
		payload: word
	};
}

export function removeFavoriteWord(id: string) {
	return {
		type: FAVORITE_WORDS_REMOVE,
		payload: id
	};
}

export function phraseFilter(phrase: string) {
	return {
		type: FAVORITE_WORDS_PHRASE_FILTER,
		payload: phrase
	};
}

export function partOfSpeechFilterAdd(partOfSpeech: string) {
	return {
		type: FAVORITE_WORDS_PART_OF_SPEECH_FILTER_ADD,
		payload: partOfSpeech
	};
}

export function partOfSpeechFilterRemove(partOfSpeech: string) {
	return {
		type: FAVORITE_WORDS_PART_OF_SPEECH_FILTER_REMOVE,
		payload: partOfSpeech
	};
}

export function wordMoveTo(key: number, to: number) {
	return {
		type: FAVORITE_WORDS_MOVE_TO,
		payload: { key, to }
	};
}