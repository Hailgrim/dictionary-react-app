import { call, put, takeEvery } from 'redux-saga/effects';

import { WORDS_REQUEST, WORDS_REQUEST_SUCCESS, WORDS_REQUEST_FAILURE, WORDS_REQUEST_SIMILAR } from './actionTypes';

export function* sagaWatcher() {
	yield takeEvery(WORDS_REQUEST, wordsRequestWorker);
}

/* ---------- START: wordsRequest ---------- */

function* wordsRequestWorker(data: any): Generator<object> {
	try {
		const result: any = yield call(wordsRequest, data.payload.trim());
		if (typeof result[0] == 'string') {
			yield put({
				type: WORDS_REQUEST_SIMILAR,
				payload: result.slice(0, 10)
			});
			/*let similarWords = result.slice(0, 10);
			let newResult = yield call(similarWordsRequest, similarWords);
			yield put({
				type: WORDS_REQUEST_SUCCESS,
				payload: newResult
			});*/
		} else {
			yield put({
				type: WORDS_REQUEST_SUCCESS,
				payload: result
			});
		}
	} catch (error) {
		console.log(error);
		yield put({
			type: WORDS_REQUEST_FAILURE,
			payload: 'Error'
		});
	}
}

async function wordsRequest(word: string) {
	const response = await fetch(`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=10be4565-43db-47b6-9b2b-fce79c969a33`);
	return await response.json();
}

/*async function similarWordsRequest(words: any) {
	const response = await Promise.all(
		words.map((word: any) => 
			fetch(`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=10be4565-43db-47b6-9b2b-fce79c969a33`)
				.then((data) => data.json())
				.then((data) => data.shift())
		)
	);
	return response;
}*/

/* ---------- END: wordsRequest ---------- */